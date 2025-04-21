import { FC, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface Location {
  name?: string;
  img?: string;
  lngLat: [number, number];
}

interface LandmarkMarkerProps {
  map: mapboxgl.Map | null;
  location: Location;
  onClick: (location: Location) => void;
}

export const LandmarkMarker: FC<LandmarkMarkerProps> = ({ map, location, onClick }) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !location.name || !location.img) return;

    const markerEl = document.createElement('div');
    markerEl.className = 'landmark-marker';
    markerEl.addEventListener('click', () => onClick(location));

    markerRef.current = new mapboxgl.Marker({ element: markerEl, anchor: 'center' })
      .setLngLat(location.lngLat)
      .addTo(map);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      markerEl.removeEventListener('click', () => onClick(location));
    };
  }, [map, location, onClick]);

  return null;
};