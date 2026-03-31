import { useState, useEffect } from 'react';
import initialContent from '../data/site-content.json';

export type SiteContent = typeof initialContent;

const STORAGE_KEY = 'ace_interiors_content';
// Use VITE_ environment variable for production flexibility
const API_URL = ''; // Relative path handled by Vite proxy

export function useContent() {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/content`);
        if (response.ok) {
          const dbContent = await response.json();
          setContent(dbContent);
          // Update cache for offline-only scenarios (optional)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dbContent));
        } else {
          const savedContent = localStorage.getItem(STORAGE_KEY);
          if (savedContent) setContent(JSON.parse(savedContent));
        }
      } catch (e) {
        console.error('API Fetch failed, using cache/initial', e);
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent) setContent(JSON.parse(savedContent));
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    setContent(newContent);
    // Sync to Database (Protected)
    try {
        const response = await fetch(`${API_URL}/api/content`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContent)
        });
        
        if (response.ok) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
        } else if (response.status === 401) {
          alert("Session expired. Please login again.");
          window.location.href = '/admin/login';
        }
    } catch(err) {
        console.error("Failed to sync to database", err);
    }
  };

  const resetContent = () => {
    if (window.confirm('Reset all site content to original defaults? This cannot be undone.')) {
      setContent(initialContent);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { content, updateContent, resetContent, loading };
}
