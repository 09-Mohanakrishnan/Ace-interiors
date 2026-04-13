import React, { useState, useEffect } from 'react';
import { useContent } from '../../hooks/useContent';
import { 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Settings,
  Loader2
} from 'lucide-react';
import ImageUpload from './ImageUpload';

interface EditorProps {
  sectionKey: string;
}

// Map sectionKey to API collection name
const COLLECTION_MAP: Record<string, string> = {
  offerings: 'offerings',
  projects: 'projects',
  blogs: 'blogs',
};

// Sections stored in SiteMeta (not separate collections)
const META_SECTIONS = ['hero', 'stats', 'pricing', 'faqs', 'testimonials'];

// Fields that should render as textareas
const TEXTAREA_FIELDS = [
  'description', 'subtitle', 'text', 'answer', 'detailedDescription',
  'challenge', 'solution', 'features', 'faqs', 'galleryImages',
  'heroTitle', 'heroDescription', 'content', 'summary'
];

export default function SectionEditor({ sectionKey }: EditorProps) {
  const { content, loading, refetch, saveSiteMeta, saveCollectionItem, deleteCollectionItem } = useContent();
  const [localContent, setLocalContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (content) {
      const data = content[sectionKey] || { title: '', items: [] };
      setLocalContent(JSON.parse(JSON.stringify(data)));
    }
  }, [content, sectionKey]);

  if (loading || !localContent) return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
    </div>
  );

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const isMetaSection = META_SECTIONS.includes(sectionKey);
  const collectionName = COLLECTION_MAP[sectionKey];

  // ============================================================
  // SAVE HANDLER — AMEER PATTERN
  // ============================================================
  const handleSave = async () => {
    setSaving(true);
    try {
      if (isMetaSection) {
        // Save directly to SiteMeta
        await saveSiteMeta(sectionKey, localContent);
        showNotification('✅ Changes saved to database!');
      } else if (collectionName) {
        // Save section-level meta (title, description) to SiteMeta
        const metaKey = `${sectionKey}_meta`;
        await saveSiteMeta(metaKey, {
          title: localContent.title || '',
          description: localContent.description || ''
        });

        // Save each item individually
        if (localContent.items && localContent.items.length > 0) {
          for (const item of localContent.items) {
            const isNew = !item._id;
            await saveCollectionItem(collectionName, item, isNew);
          }
        }
        showNotification('✅ All items saved to database!');
      }
      // Re-fetch fresh data from API to confirm persistence
      await refetch();
    } catch (error: any) {
      console.error('Save failed:', error);
      showNotification('❌ Save failed! Check console.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE HANDLER — AMEER PATTERN
  // ============================================================
  const handleDeleteItem = async (index: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    const item = localContent.items[index];
    
    if (item._id && collectionName) {
      // Delete from database
      try {
        await deleteCollectionItem(collectionName, item._id);
        showNotification('🗑️ Item deleted from database!');
      } catch (error) {
        showNotification('❌ Delete failed!', 'error');
        return;
      }
    }
    
    // Remove from local state
    const newItems = [...localContent.items];
    newItems.splice(index, 1);
    setLocalContent({ ...localContent, items: newItems });
    
    // Re-fetch to confirm
    await refetch();
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reload from the database?')) {
      await refetch();
      showNotification('🔄 Reloaded from database.');
    }
  };

  // ============================================================
  // FIELD HELPERS
  // ============================================================
  const updateField = (path: string, value: any) => {
    const newContent = { ...localContent };
    const parts = path.split('.');
    let current = newContent;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) current[part] = {};
        current = current[part];
    }
    current[parts[parts.length - 1]] = value;
    setLocalContent(newContent);
  };

  const addItem = (template: any) => {
    const newItems = [...(localContent.items || []), { ...template }];
    setLocalContent({ ...localContent, items: newItems });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const list = [...localContent.items];
    if (direction === 'up' && index > 0) {
      [list[index], list[index - 1]] = [list[index - 1], list[index]];
    } else if (direction === 'down' && index < list.length - 1) {
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
    }
    setLocalContent({ ...localContent, items: list });
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex justify-between items-center sticky top-24 bg-gray-50/80 backdrop-blur-md py-4 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{sectionKey} Management</h1>
          <p className="text-gray-500">Edit the content of the {sectionKey} section. Changes save directly to the database.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-600"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reload</span>
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-brand-orange text-white rounded-2xl hover:bg-brand-black transition-all font-bold shadow-lg shadow-brand-orange/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>{saving ? 'Saving...' : 'Save to DB'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Fields (strings at top level) */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
          <h3 className="font-bold text-gray-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-brand-orange" />
            <span>General Settings</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(localContent).map(([key, value]) => {
              if (key === 'items' || key === '_id' || key === '__v' || key === 'createdAt' || key === 'updatedAt') return null;
              if (typeof value === 'string') {
                const isImageField = ['image', 'backgroundimage', 'icon', 'avatar'].some(keyword => key.toLowerCase().includes(keyword.toLowerCase()));

                if (isImageField) {
                  return (
                    <div key={key} className="col-span-1 md:col-span-2">
                       <ImageUpload label={key} value={value} onChange={(url) => updateField(key, url)} />
                    </div>
                  );
                }

                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <textarea 
                      rows={TEXTAREA_FIELDS.includes(key) ? 4 : 1}
                      className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all text-gray-900 ${TEXTAREA_FIELDS.includes(key) ? '' : 'overflow-hidden whitespace-nowrap'}`}
                      value={value}
                      style={{ resize: TEXTAREA_FIELDS.includes(key) ? 'vertical' : 'none' }}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  </div>
                );
              }
              // Handle nested objects (like hero stats, pricing items, faq items, testimonial items)
              if (Array.isArray(value) && typeof value[0] === 'object') {
                return (
                  <div key={key} className="col-span-1 md:col-span-2 space-y-4">
                    <label className="text-sm font-bold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')} (Nested Items)</label>
                    {value.map((subItem: any, si: number) => (
                      <div key={si} className="bg-gray-50 p-4 rounded-xl border flex flex-wrap gap-3 items-end">
                        {Object.entries(subItem).filter(([k]) => k !== '_id').map(([subKey, subVal]) => (
                          <div key={subKey} className="flex-1 min-w-[200px]">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">{subKey}</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-brand-orange outline-none"
                              value={subVal as string || ''}
                              onChange={(e) => {
                                const newArr = [...value];
                                newArr[si] = { ...newArr[si], [subKey]: e.target.value };
                                updateField(key, newArr);
                              }}
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newArr = value.filter((_: any, i: number) => i !== si);
                            updateField(key, newArr);
                          }}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const template = Object.fromEntries(Object.keys(value[0] || {}).filter(k => k !== '_id').map(k => [k, '']));
                        updateField(key, [...value, template]);
                      }}
                      className="text-brand-orange text-sm font-bold flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add {key} Item
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Collection Items (offerings, projects, blogs) */}
        {localContent.items && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-brand-orange" />
                    <span>Items ({localContent.items.length})</span>
                </h3>
                <button 
                  onClick={() => {
                    const template = localContent.items.length > 0 
                      ? Object.fromEntries(Object.keys(localContent.items[0]).filter(k => k !== '_id' && k !== '__v' && k !== 'createdAt' && k !== 'updatedAt').map(k => [k, '']))
                      : { id: '', title: '', description: '', image: '' };
                    addItem(template);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-brand-orange transition-all font-bold text-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                </button>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {localContent.items.map((item: any, index: number) => (
                    <div key={item._id || index} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
                        <div className="p-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <span className="ml-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                              {item._id ? `DB ID: ${item._id.slice(-6)}` : 'NEW (unsaved)'}
                            </span>
                            <div className="flex space-x-1">
                                <button onClick={() => moveItem(index, 'up')} className="p-2 text-gray-400 hover:text-brand-orange transition-colors"><ChevronUp className="w-4 h-4" /></button>
                                <button onClick={() => moveItem(index, 'down')} className="p-2 text-gray-400 hover:text-brand-orange transition-colors"><ChevronDown className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteItem(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(item).filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key)).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                    {(() => {
                                        const isImageField = ['image', 'backgroundimage', 'icon', 'avatar'].some(keyword => key.toLowerCase().includes(keyword.toLowerCase()));
                                        
                                        if (isImageField) {
                                            return <ImageUpload label={key} value={value as string} onChange={(url) => {
                                                const newItems = [...localContent.items];
                                                newItems[index] = { ...newItems[index], [key]: url };
                                                setLocalContent({ ...localContent, items: newItems });
                                            }} />;
                                        }

                                        return (
                                          <>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{key}</label>
                                            {TEXTAREA_FIELDS.includes(key) ? (
                                                <textarea 
                                                    rows={4}
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-100 focus:ring-1 focus:ring-brand-orange outline-none transition-all text-sm resize-y"
                                                    value={value as string}
                                                    onChange={(e) => {
                                                        const newItems = [...localContent.items];
                                                        newItems[index] = { ...newItems[index], [key]: e.target.value };
                                                        setLocalContent({ ...localContent, items: newItems });
                                                    }}
                                                />
                                            ) : (
                                                <input 
                                                    type="text"
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-100 focus:ring-1 focus:ring-brand-orange outline-none transition-all text-sm"
                                                    value={value as string}
                                                    onChange={(e) => {
                                                        const newItems = [...localContent.items];
                                                        newItems[index] = { ...newItems[index], [key]: e.target.value };
                                                        setLocalContent({ ...localContent, items: newItems });
                                                    }}
                                                />
                                            )}
                                          </>
                                        );
                                    })()}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right duration-300">
          <div className={`${toastType === 'error' ? 'bg-red-600' : 'bg-gray-900'} text-white px-6 py-4 rounded-2xl flex items-center space-x-3 shadow-2xl`}>
            {toastType === 'error' ? <AlertCircle className="w-5 h-5 text-red-200" /> : <CheckCircle className="w-5 h-5 text-green-400" />}
            <span className="font-bold">{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
