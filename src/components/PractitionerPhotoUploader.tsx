import React, { useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import { usePractitionerPhoto } from '../utils/practitionerPhoto';

interface Props {
  className?: string;
  variant?: 'badge' | 'button';
}

export const PractitionerPhotoUploader: React.FC<Props> = ({ 
  className = '',
  variant = 'badge'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isCustomPhoto, saveCustomPhoto, resetToDefault } = usePractitionerPhoto();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await saveCustomPhoto(file);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload official practitioner photo"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        title="Upload official photo file directly from your device"
        className={
          variant === 'badge'
            ? 'inline-flex items-center gap-1 px-2 py-1 rounded-md bg-stone-900/90 hover:bg-amber-500 hover:text-black text-amber-300 text-[10px] font-bold border border-amber-500/40 backdrop-blur-sm transition-all shadow'
            : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 text-xs font-semibold border border-amber-500/40 transition-all'
        }
      >
        <Camera className="w-3 h-3" />
        <span>{isCustomPhoto ? 'Change Photo' : 'Upload Exact Photo'}</span>
      </button>

      {isCustomPhoto && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            resetToDefault();
          }}
          title="Reset to default photo"
          className="p-1 rounded-md bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-rose-400 border border-stone-700 text-[10px] transition-all"
        >
          <RefreshCw className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
};
