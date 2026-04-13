import { useState, useEffect, useCallback } from 'react';

// ============================================================
// AMEER-PATTERN: No localStorage, no monolithic JSON blob.
// Each section fetches its own data from the API.
// This hook is now only used by the Admin panel for editing.
// ============================================================

const API_URL = '';

export type SiteContent = any;

// Safe empty defaults — prevents white-page crash while API loads
const EMPTY_CONTENT = {
  hero: { title: [], subtitle: '', backgroundImage: '', trustBadge: '', stats: [] },
  stats: [],
  pricing: { title: '', description: '', items: [] },
  faqs: { title: '', description: '', items: [] },
  testimonials: { title: '', description: '', items: [] },
  offerings: { title: '', description: '', items: [] },
  projects: { title: '', description: '', items: [] },
  blogs: { title: '', description: '', items: [] },
};

export function useContent() {
  const [content, setContent] = useState<SiteContent>(EMPTY_CONTENT);

  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [metaRes, offeringsRes, projectsRes, blogsRes] = await Promise.all([
        fetch(`${API_URL}/api/site-meta`),
        fetch(`${API_URL}/api/offerings`),
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/blogs`),
      ]);

      const meta = metaRes.ok ? await metaRes.json() : {};
      const offerings = offeringsRes.ok ? await offeringsRes.json() : [];
      const projects = projectsRes.ok ? await projectsRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];

      setContent({
        hero: meta.hero || {},
        stats: meta.stats || [],
        pricing: meta.pricing || {},
        faqs: meta.faqs || {},
        testimonials: meta.testimonials || {},
        offerings: {
          title: meta.offerings_meta?.title || '',
          description: meta.offerings_meta?.description || '',
          items: offerings
        },
        projects: {
          title: meta.projects_meta?.title || '',
          description: meta.projects_meta?.description || '',
          items: projects
        },
        blogs: {
          title: meta.blogs_meta?.title || '',
          description: meta.blogs_meta?.description || '',
          items: blogs
        }
      });
    } catch (e) {
      console.error('Failed to fetch content from API', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Individual save functions (Ameer pattern)
  const saveSiteMeta = async (section: string, data: any) => {
    const res = await fetch(`${API_URL}/api/site-meta`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [section]: data })
    });
    if (res.status === 401) {
      alert('Session expired. Please login again.');
      window.location.href = '/admin/login';
      return false;
    }
    if (!res.ok) throw new Error('Failed to save');
    return true;
  };

  const saveCollectionItem = async (collection: string, item: any, isNew: boolean) => {
    const url = isNew 
      ? `${API_URL}/api/${collection}` 
      : `${API_URL}/api/${collection}/${item._id}`;
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (res.status === 401) {
      alert('Session expired. Please login again.');
      window.location.href = '/admin/login';
      return null;
    }
    if (!res.ok) throw new Error('Failed to save');
    return await res.json();
  };

  const deleteCollectionItem = async (collection: string, id: string) => {
    const res = await fetch(`${API_URL}/api/${collection}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.status === 401) {
      alert('Session expired. Please login again.');
      window.location.href = '/admin/login';
      return false;
    }
    if (!res.ok) throw new Error('Failed to delete');
    return true;
  };

  return { 
    content, 
    loading, 
    refetch: fetchAll,
    saveSiteMeta, 
    saveCollectionItem, 
    deleteCollectionItem 
  };
}
