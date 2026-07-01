import { FC, useEffect } from 'react';

type Position = [number, number];
type RestrictedAreaFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  { id: number }
>;

interface RestrictedAreaProps {
  map: mapboxgl.Map | null;
  zoom: number;
  areas: Position[][];
}

const SOURCE_ID = 'restricted-area-source';
const FILL_LAYER_ID = 'restricted-area-fill-layer';
const HATCH_LAYER_ID = 'restricted-area-hatch-layer';
const OUTLINE_LAYER_ID = 'restricted-area-outline-layer';
const PATTERN_ID = 'restricted-area-hatch-pattern';
const ZOOM_THRESHOLD = 13;

const closeRing = (ring: Position[]): Position[] => {
  if (ring.length === 0) return ring;

  const [firstLng, firstLat] = ring[0];
  const [lastLng, lastLat] = ring[ring.length - 1];

  if (firstLng === lastLng && firstLat === lastLat) {
    return ring;
  }

  return [...ring, ring[0]];
};

const createHatchPattern = (): ImageData => {
  const size = 28;
  const data = new Uint8ClampedArray(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const isPrimaryLine = Math.abs(x - y) <= 1;
      const isSecondaryLine = Math.abs(x + y - (size - 1)) <= 1;
      const isLine = isPrimaryLine || isSecondaryLine;

      if (!isLine) continue;

      const index = (y * size + x) * 4;
      data[index] = 255;
      data[index + 1] = 255;
      data[index + 2] = 255;
      data[index + 3] = 190;
    }
  }

  return new ImageData(data, size, size);
};

const buildFeatureCollection = (
  areas: Position[][],
): RestrictedAreaFeatureCollection => ({
  type: 'FeatureCollection',
  features: areas.map((area, index) => ({
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [closeRing(area)],
    },
    properties: {
      id: index,
    },
  })),
});

const ensureRestrictedLayers = (map: mapboxgl.Map) => {
  if (!map.hasImage(PATTERN_ID)) {
    map.addImage(PATTERN_ID, createHatchPattern(), { pixelRatio: 2 });
  }

  if (!map.getLayer(FILL_LAYER_ID)) {
      map.addLayer({
        id: FILL_LAYER_ID,
        type: 'fill',
        source: SOURCE_ID,
        paint: {
          'fill-color': '#ef4444',
          'fill-opacity': 0.42,
        },
      });
  }

  if (!map.getLayer(HATCH_LAYER_ID)) {
    map.addLayer({
      id: HATCH_LAYER_ID,
        type: 'fill',
        source: SOURCE_ID,
        paint: {
          'fill-pattern': PATTERN_ID,
          'fill-opacity': 1,
        },
      });
  }

  // if (!map.getLayer(OUTLINE_LAYER_ID)) {
  //   map.addLayer({
  //     id: OUTLINE_LAYER_ID,
  //       type: 'line',
  //       source: SOURCE_ID,
  //       paint: {
  //         'line-color': '#BD7076',
  //         'line-width': 4,
  //         'line-opacity': 1,
  //       },
  //     });
  // }
};

export const RestrictedArea: FC<RestrictedAreaProps> = ({
  map,
  zoom,
  areas,
}) => {
  useEffect(() => {
    if (!map || zoom < ZOOM_THRESHOLD || areas.length === 0) return;

    const featureCollection = buildFeatureCollection(areas);

    if (map.getSource(SOURCE_ID)) {
      const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource;
      source.setData(featureCollection);
      ensureRestrictedLayers(map);
      return;
    }

    map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: featureCollection,
    });

    ensureRestrictedLayers(map);

    return () => {
      [OUTLINE_LAYER_ID, HATCH_LAYER_ID, FILL_LAYER_ID].forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
      });

      if (map.getSource(SOURCE_ID)) {
        map.removeSource(SOURCE_ID);
      }

      if (map.hasImage(PATTERN_ID)) {
        map.removeImage(PATTERN_ID);
      }
    };
  }, [map, zoom, areas]);

  return null;
};
