import { FC, useEffect } from 'react';
     import mapboxgl from 'mapbox-gl';

     interface Location {
       lngLat: [number, number];
     }

     interface HQMarkerProps {
       map: mapboxgl.Map | null;
       location: Location;
     }

     export const HQMarker: FC<HQMarkerProps> = ({ map, location }) => {
       useEffect(() => {
         if (!map) return;

         const markerEl = document.createElement('div');
         markerEl.className = 'hq-marker';

         const marker = new mapboxgl.Marker(markerEl)
           .setLngLat(location.lngLat)
           .addTo(map);

         return () => {
           marker.remove();
         };
       }, [map, location]);

       return null;
     }; 