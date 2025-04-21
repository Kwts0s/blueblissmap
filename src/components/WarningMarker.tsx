import { FC, useEffect } from 'react';
     import mapboxgl from 'mapbox-gl';

     interface Location {
       lngLat: [number, number];
     }

     interface WarningMarkerProps {
       map: mapboxgl.Map | null;
       location: Location;
     }

     export const WarningMarker: FC<WarningMarkerProps> = ({ map, location }) => {
       useEffect(() => {
         if (!map) return;

         const markerEl = document.createElement('div');
         markerEl.className = 'warning-marker';

         const marker = new mapboxgl.Marker(markerEl)
           .setLngLat(location.lngLat)
           .addTo(map);

         return () => {
           marker.remove();
         };
       }, [map, location]);

       return null;
     };