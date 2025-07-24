import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 flex items-center justify-center">Loading map...</div>
});

export default Map;
