import React, { useState, useEffect } from 'react';
import { useContent, SiteContent } from '../../hooks/useContent';
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
  Settings
} from 'lucide-react';

interface EditorProps {
  sectionKey: keyof SiteContent;
}

export default function SectionEditor({ sectionKey }: EditorProps) {
  const { content, updateContent, resetContent } = useContent();
  const [localContent, setLocalContent] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (content) {
      const data = content[sectionKey] || { title: '', items: [] };
      setLocalContent(JSON.parse(JSON.stringify(data)));
    }
  }, [content, sectionKey]);

  if (!localContent) return <div>Loading...</div>;

  const handleSave = () => {
    const updated = { ...content, [sectionKey]: localContent };
    updateContent(updated);
    setToastMsg('Changes saved successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset this section to its original content?')) {
      resetContent();
      setToastMsg('Section reset to default.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

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

  const addItem = (listPath: string, template: any) => {
    const newContent = { ...localContent };
    const parts = listPath.split('.');
    let current = newContent;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) current[part] = {};
        current = current[part];
    }
    current[parts[parts.length - 1]].push({ ...template });
    setLocalContent(newContent);
  };

  const removeItem = (listPath: string, index: number) => {
    const newContent = { ...localContent };
    const parts = listPath.split('.');
    let current = newContent;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) current[part] = {};
        current = current[part];
    }
    current[parts[parts.length - 1]].splice(index, 1);
    setLocalContent(newContent);
  };

  const moveItem = (listPath: string, index: number, direction: 'up' | 'down') => {
    const newContent = { ...localContent };
    const parts = listPath.split('.');
    let current = newContent;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) current[part] = {};
        current = current[part];
    }
    const list = current[parts[parts.length - 1]];
    if (direction === 'up' && index > 0) {
      [list[index], list[index - 1]] = [list[index - 1], list[index]];
    } else if (direction === 'down' && index < list.length - 1) {
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
    }
    setLocalContent(newContent);
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex justify-between items-center sticky top-24 bg-gray-50/80 backdrop-blur-md py-4 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{sectionKey} Management</h1>
          <p className="text-gray-500">Edit the content of the {sectionKey} section.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-600"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-brand-orange text-white rounded-2xl hover:bg-brand-black transition-all font-bold shadow-lg shadow-brand-orange/20"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Fields */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
          <h3 className="font-bold text-gray-900 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-brand-orange" />
            <span>General Settings</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(localContent).map(([key, value]) => {
              if (typeof value === 'string') {
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <textarea 
                      rows={['description', 'subtitle', 'text', 'answer', 'detailedDescription', 'challenge', 'solution', 'features', 'faqs', 'galleryImages'].includes(key) ? 4 : 1}
                      className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-orange outline-none transition-all text-gray-900 ${['description', 'subtitle', 'text', 'answer', 'detailedDescription', 'challenge', 'solution', 'features', 'faqs', 'galleryImages'].includes(key) ? '' : 'overflow-hidden whitespace-nowrap'}`}
                      value={value}
                      style={{ resize: ['description', 'subtitle', 'text', 'answer', 'detailedDescription', 'challenge', 'solution', 'features', 'faqs', 'galleryImages'].includes(key) ? 'vertical' : 'none' }}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* List Items */}
        {localContent.items && (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-brand-orange" />
                    <span>List Items ({localContent.items.length})</span>
                </h3>
                <button 
                  onClick={() => addItem('items', Object.fromEntries(Object.keys(localContent.items[0]).map(k => [k, ''])))}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-brand-orange transition-all font-bold text-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                </button>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {localContent.items.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
                        <div className="p-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <span className="ml-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Item #{index + 1}</span>
                            <div className="flex space-x-1">
                                <button onClick={() => moveItem('items', index, 'up')} className="p-2 text-gray-400 hover:text-brand-orange transition-colors"><ChevronUp className="w-4 h-4" /></button>
                                <button onClick={() => moveItem('items', index, 'down')} className="p-2 text-gray-400 hover:text-brand-orange transition-colors"><ChevronDown className="w-4 h-4" /></button>
                                <button onClick={() => removeItem('items', index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(item).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{key}</label>
                                    {['description', 'text', 'answer', 'detailedDescription', 'challenge', 'solution', 'features', 'faqs', 'galleryImages', 'heroTitle', 'heroDescription', 'content', 'summary'].includes(key) ? (
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
          <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl flex items-center space-x-3 shadow-2xl">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-bold">{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
