import { FC, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface Location {
  name?: string;
  img?: string;
  lngLat: [number, number];
}

interface BeachMarkerProps {
  map: mapboxgl.Map | null;
  location: Location;
  onClick: (location: Location) => void;
}

export const BeachMarker: FC<BeachMarkerProps> = ({
  map,
  location,
  onClick,
}) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !location.name || !location.img) return;

    const markerEl = document.createElement("div");
    markerEl.className = "beach-marker";
    markerEl.addEventListener("click", () => onClick(location));

    markerRef.current = new mapboxgl.Marker({ element: markerEl, anchor: 'center' })
    .setLngLat(location.lngLat)
      .addTo(map);

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map, location, onClick]);

  return null;
};
