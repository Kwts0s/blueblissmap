import { FC, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface Location {
  lngLat: [number, number];
}

interface AnchorageMarkerProps {
  map: mapboxgl.Map | null;
  location: Location;
}

export const AnchorageMarker: FC<AnchorageMarkerProps> = ({ map, location }) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const markerEl = document.createElement('div');
    markerEl.className = 'anchorage-marker';

    markerRef.current = new mapboxgl.Marker({ element: markerEl, anchor: 'center' })
      .setLngLat(location.lngLat)
      .addTo(map);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map, location]);

  return null;
};