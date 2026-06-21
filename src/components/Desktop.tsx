'use client';

import { useOSStore } from '@/store/useOSStore';
import Dock from './Dock';
import Window from './Window';
import Widgets from './Widgets';
import Taskbar from './Taskbar';

const Desktop = () => {
  const { windows, wallpaper } = useOSStore(state => state);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={
        wallpaper
          ? {
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          : { backgroundColor: '#050505' }
      }
    >
      <div className="absolute inset-0 bg-black/40" />
      <Widgets />
      <Dock />
      {windows
        .filter(w => w.isOpen)
        .map(window => (
          <Window key={window.id} window={window} />
        ))}
      <Taskbar />
    </div>
  );
};

export default Desktop;
