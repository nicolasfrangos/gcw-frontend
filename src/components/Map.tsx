'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

// ... (Icon fix remains the same)

type MapProps = {
  pins: {
    lat: number;
    lng: number;
    popupText: string;
    slug: string;
  }[];
};

export default function Map({ pins }: MapProps) {
  // ... (Map loading and center logic remains the same)

  return (
    <MapContainer center={center} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin, index) => (
        <Marker key={index} position={[pin.lat, pin.lng]}>
          <Popup>
            <Link href={pin.slug} className="font-bold hover:underline">
              {pin.popupText}
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
