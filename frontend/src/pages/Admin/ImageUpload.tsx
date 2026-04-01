import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiUrl = import.meta.env.PROD ? 'https://aceinterioranddesigns.com' : 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type, fetch will set it with the boundary for FormData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      // Add a timestamp cache buster to force the browser to fetch the new image
      onChange(`${data.url}?t=${Date.now()}`);
    } catch (err) {
      console.error('Upload Error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-sm font-bold text-gray-700 capitalize">{label.replace(/([A-Z])/g, ' $1')}</label>}
      
      <div className="flex items-start space-x-6">
        {value ? (
          <div className="relative group w-32 h-32 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50 flex items-center justify-center">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => onChange('')}
                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-brand-orange hover:bg-orange-50 transition-colors flex-shrink-0"
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-brand-orange animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500 font-medium">Upload Image</span>
              </>
            )}
          </button>
        )}

        <div className="flex flex-col justify-center h-32">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {!value && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm w-fit disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Browse Files'}
            </button>
          )}
          {value && (
            <p className="text-sm text-green-600 font-medium flex items-center mb-2">
              <CheckCircle className="w-4 h-4 mr-1" />
              Image Uploaded
            </p>
          )}
          {error && <p className="text-red-500 text-sm font-medium mt-2">{error}</p>}
          <p className="text-xs text-gray-500 mt-2">Recommended: WebP, JPG, PNG format.<br/>Maximum file size: 5MB.</p>
        </div>
      </div>
    </div>
  );
}
