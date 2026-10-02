import { useState, useEffect } from 'react';

const STORAGE_KEY = 'anny_official_photo_v1';
export const DEFAULT_PORTRAIT_PHOTO = '/images/founding-practitioner.jpg?v=5';
export const DEFAULT_SQUARE_PHOTO = '/images/founding-practitioner-square.jpg?v=5';

export function usePractitionerPhoto() {
  const [photo, setPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_PORTRAIT_PHOTO;
    } catch {
      return DEFAULT_PORTRAIT_PHOTO;
    }
  });

  const [squarePhoto, setSquarePhoto] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_SQUARE_PHOTO;
    } catch {
      return DEFAULT_SQUARE_PHOTO;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setPhoto(saved);
          setSquarePhoto(saved);
        } else {
          setPhoto(DEFAULT_PORTRAIT_PHOTO);
          setSquarePhoto(DEFAULT_SQUARE_PHOTO);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('anny-photo-updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('anny-photo-updated', handleStorageChange);
    };
  }, []);

  const saveCustomPhoto = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select a valid image file.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          if (result) {
            localStorage.setItem(STORAGE_KEY, result);
            setPhoto(result);
            setSquarePhoto(result);
            window.dispatchEvent(new Event('anny-photo-updated'));
            resolve(result);
          } else {
            reject(new Error('Failed to read image data.'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Error reading image file.'));
      reader.readAsDataURL(file);
    });
  };

  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPhoto(DEFAULT_PORTRAIT_PHOTO);
      setSquarePhoto(DEFAULT_SQUARE_PHOTO);
      window.dispatchEvent(new Event('anny-photo-updated'));
    } catch {
      // ignore
    }
  };

  return {
    portraitPhoto: photo,
    squarePhoto: squarePhoto,
    isCustomPhoto: photo.startsWith('data:'),
    saveCustomPhoto,
    resetToDefault
  };
}
