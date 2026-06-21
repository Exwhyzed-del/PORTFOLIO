'use client';

import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';
import { useOSStore } from '@/store/useOSStore';

export default function Home() {
  const bootSequenceComplete = useOSStore(state => state.bootSequenceComplete);

  return (
    <main>
      {!bootSequenceComplete ? <BootScreen /> : <Desktop />}
    </main>
  );
}
