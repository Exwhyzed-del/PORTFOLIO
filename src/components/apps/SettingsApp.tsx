'use client';

import { useOSStore } from '@/store/useOSStore';

const SettingsApp = () => {
  const { wallpaper, setWallpaper } = useOSStore(state => state);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Settings</h1>
      <div className="glass p-4 rounded-xl">
        <h2 className="text-xl font-bold text-secondary mb-4">Wallpaper</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { path: '/wallpapers/blackhole.jpg', name: 'Black Hole' },
            { path: '/wallpapers/car.jpg', name: 'Car' },
            { path: '/wallpapers/ghost.jpg', name: 'Ghost' },
            { path: '/wallpapers/miles-swinging-through-queen-lights-ka-1920x1080.jpg', name: 'Spiderman' },
            { path: '/wallpapers/shrine.png', name: 'Shrine' },
            { path: '/wallpapers/scenery.png', name: 'Scenery' },
          ].map((wall, index) => (
            <div
              key={index}
              onClick={() => setWallpaper(wall.path)}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                wallpaper === wall.path ? 'border-primary' : 'border-transparent hover:border-primary/50'
              }`}
            >
              <div
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${wall.path})` }}
              />
              <div className="p-2 text-center text-sm text-gray-300">{wall.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;