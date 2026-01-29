import { useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { type Map as LeafletMapInstance } from 'leaflet';

// Fix default marker icons for Vite (Leaflet's default asset paths break in bundlers).
// This keeps the UI stable without affecting layout.
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type LatLng = { lat: number; lng: number };

export interface MapMarker extends LatLng {
  id: string;
  title: string;
  description?: string;
}

interface LeafletMapProps {
  center: LatLng;
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export const LeafletMap = ({
  center,
  zoom = 13,
  markers = [],
  className = '',
}: LeafletMapProps) => {
  const mapRef = useRef<LeafletMapInstance | null>(null);

  const bounds = useMemo(() => {
    if (markers.length > 0) {
      const latLngs = markers.map((m) => [m.lat, m.lng] as [number, number]);
      return L.latLngBounds(latLngs);
    }
    // Fallback bounds around center (prevents empty grey tiles and feels consistent)
    return L.latLngBounds(
      [center.lat - 0.01, center.lng - 0.01],
      [center.lat + 0.01, center.lng + 0.01],
    );
  }, [center.lat, center.lng, markers]);

  return (
    <div className={`h-64 rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        ref={mapRef}
        bounds={bounds}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => {
          // Ensure deterministic initial viewport
          mapRef.current?.setView([center.lat, center.lng], zoom);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{m.title}</div>
                {m.description && <div className="text-gray-600">{m.description}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

