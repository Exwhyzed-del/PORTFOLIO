'use client';

import { useOSStore } from '@/store/useOSStore';
import { Upload, Trash2 } from 'lucide-react';

const SettingsApp = () => {
  const { wallpaper, setWallpaper, uploadedWallpapers, addUploadedWallpaper } = useOSStore(state => state);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        addUploadedWallpaper(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const allWallpapers = uploadedWallpapers.map((url, index) => ({
    id: `uploaded-${index}`,
    name: `Custom ${index + 1}`,
    url
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Settings</h1>
      <div className="glass p-4 rounded-xl mb-4">
        <h2 className="text-xl font-bold text-secondary mb-4">Wallpaper</h2>
        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-primary/50 hover:border-primary rounded-lg p-6 cursor-pointer mb-4 transition-all">
          <Upload className="w-6 h-6 text-primary" />
          <span className="text-primary font-medium">Upload Your Wallpaper</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        {allWallpapers.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allWallpapers.map((wp) => (
              <div key={wp.id} className="relative group">
                <div
                  onClick={() => setWallpaper(wp.url)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${wallpaper === wp.url ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                >
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${wp.url})` }}
                  />
                  <div className="p-2 text-center text-sm text-gray-300">{wp.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {allWallpapers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No wallpapers uploaded yet! Upload your first one above!
          </div>
        )}
      </div>
      <div className="glass p-4 rounded-xl">
        <h2 className="text-xl font-bold text-accent mb-4">Appearance</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Theme</span>
            <select className="bg-[#111] text-primary border border-primary/30 rounded px-3 py-1">
              <option>Dark Cyberpunk</option>
              <option>Matrix</option>
              <option>Neon Blue</option>
              <option>Purple Hacker</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Blur Intensity</span>
            <input type="range" className="accent-primary" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Animation Speed</span>
            <input type="range" className="accent-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
