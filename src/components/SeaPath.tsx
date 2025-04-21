import { FC, useEffect } from 'react';

interface SeaPathProps {
  map: mapboxgl.Map | null;
  isVisible: boolean;
  zoom: number;
  paths: [number, number][][]; // Array of lines, each line is an array of [lng, lat] coordinates
}

export const SeaPath: FC<SeaPathProps> = ({ map, isVisible, zoom, paths }) => {
  useEffect(() => {
    if (!map || isVisible || zoom < 12) return;

    // Add a source and layer for each path
    paths.forEach((path, index) => {
      const sourceId = `sea-path-${index}`;
      const layerId = `sea-path-layer-${index}`;

      // Skip if source already exists
      if (map.getSource(sourceId)) return;

      // Add GeoJSON source for the sea path
      map.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: path,
          },
          properties: {},
        },
      });

      // Add line layer for the sea path
      map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'miter',
          'line-cap': 'square',
        },
        paint: {
          'line-color': '#9684D8',
          'line-width': 20,
          'line-opacity': 0.2,
        },
      });
    });

    return () => {
      // Clean up all layers and sources
      paths.forEach((_, index) => {
        const sourceId = `sea-path-${index}`;
        const layerId = `sea-path-layer-${index}`;
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      });
    };
  }, [map, isVisible, zoom, paths]);

  return null;
};