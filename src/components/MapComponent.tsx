import { FC, useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { NavigationMenu } from "./NavigationMenu";
import { BeachMarker } from "./BeachMarker";
import { LandmarkMarker } from "./LandmarkMarker";
import { WarningMarker } from "./WarningMarker";
import { HQMarker } from "./HQMarker";
import { Modal } from "./Modal";
import { AnchorageMarker } from "./AnchorageMarker";
import { SeaPath } from "./SeaPath";
import { Preloader } from "./Preloader";

interface Location {
  name?: string;
  img?: string;
  lngLat: [number, number];
}

const beaches: Location[] = [
  {
    name: "Kanoula Beach",
    img: "/Kanoula.jpg",
    lngLat: [20.075605, 39.371323],
  },
  {
    name: "Papanikolis Cave",
    img: "/papanikolis.jpg",
    lngLat: [20.217499, 39.399461],
  },
  {
    name: "Bella Vraka Beach",
    img: "/bella.jpg",
    lngLat: [20.235556, 39.399386],
  },
  { name: "Pisina Beach", img: "/pisina.jpg", lngLat: [20.219699, 39.403726] },
  {
    name: "Voutoumi Beach",
    img: "/voutoumi.jpg",
    lngLat: [20.227327, 39.157765],
  },
  {
    name: "Monodendri Beach",
    img: "/monodendri.jpg",
    lngLat: [20.151747, 39.231144],
  },
  {
    name: "Kipiadi Beach",
    img: "/kipiadi.jpg",
    lngLat: [20.168973, 39.217528],
  },
  { name: "Harami Beach", img: "/harami.jpg", lngLat: [20.13132, 39.235916] },
  { name: "Kavos Beach", img: "/kavos.jpg", lngLat: [20.114293, 39.386624] },
  { name: "Bouka Beach", img: "/mpouka.jpg", lngLat: [20.086849, 39.433575] },
  { name: "Notos Beach", img: "/notos.jpg", lngLat: [20.00384, 39.448356] },
  {
    name: "Arkoudilas Beach",
    img: "/arkoudilas.jpg",
    lngLat: [20.101, 39.366388],
  },
  {
    name: "Marathias Beach",
    img: "/marathias.jpg",
    lngLat: [19.983986, 39.414223],
  },
  { name: "Lefkimmi", img: "/lefk.jpg", lngLat: [20.096971, 39.415188] },
];

const landmarks: Location[] = [
  { name: "Sivota", img: "/sivot.jpg", lngLat: [20.235937, 39.407915] },
  { name: "Paxoi", img: "/paxos.jpg", lngLat: [20.188193, 39.199735] },
  { name: "Corfu City", img: "/corfu.jpeg", lngLat: [19.92446, 39.626376] },
];

const warnings: Location[] = [
  { lngLat: [20.225197, 39.398572] },
  { lngLat: [20.235161, 39.399938] },
  { lngLat: [20.241787, 39.396721] },
  { lngLat: [20.213326, 39.446123] },
  { lngLat: [20.070584, 39.46504] },
];

const hq: Location[] = [
  { lngLat: [20.119202, 39.382266] },
  { lngLat: [19.896682, 39.630671] },
];

const anchorages: Location[] = [
  { lngLat: [20.224354, 39.402483] },
  { lngLat: [20.219571, 39.404198] },
  { lngLat: [20.100163, 39.365321] },
  { lngLat: [20.004768, 39.448326] },
  { lngLat: [19.868421, 39.71585] },
  { lngLat: [19.895639, 39.63073] },
  { lngLat: [20.119805,39.382366] },
];

const seaPaths: [number, number][][] = [
  [
    [20.127884, 39.382641],
    [20.207513, 39.400821],
  ],
  [
    [19.897214, 39.636832],
    [19.879759, 39.710945],
  ],
];
export const MapComponent: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [layerVisible, setLayerVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(7);
  const [selectedLandmark, setSelectedLandmark] = useState<Location | null>(
    null
  );
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleLandmarkClick = useCallback((landmark: Location) => {
    setSelectedLandmark(landmark);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!token) {
      setError("Mapbox token is missing. Please check .env file.");
      console.error("VITE_MAPBOX_TOKEN is not set in .env");
      return;
    }

    // Read location from URL parameter
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location")?.toLowerCase() || "corfu";
    const initialCenter: [number, number] =
      location === "corfu" ? [19.921, 39.62] : [24.173947, 35.448988];
    const initialZoom = location === "corfu" ? 8.5 : 10;

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/kostasgall/clsn4k2s800mx01qx596u4sur",
        center: initialCenter,
        zoom: initialZoom,
      });

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      map.current.on("zoom", () => {
        if (map.current) {
          setZoom(map.current.getZoom());
        }
      });

      map.current.on("load", () => {
        if (!map.current) return;

        try {
          map.current.addSource("area", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [20.070584, 39.46504],
                    [20.124893, 39.380089],
                    [20.109444, 39.35368],
                    [20.00104, 39.396607],
                    [19.966192, 39.41881],
                    [19.911389, 39.428536],
                    [20.075111, 39.318628],
                    [20.277801, 39.375943],
                    [20.263038, 39.390803],
                    [20.240378, 39.396109],
                    [20.232439, 39.410833],
                    [20.202141, 39.449185],
                    [20.022978, 39.675611],
                    [19.886082, 39.716956],
                    [19.869101, 39.655537],
                    [19.943041, 39.630016],
                    [19.951588, 39.477597],
                    [19.999065, 39.461776],
                    [20.021038, 39.437386],
                    [20.04241, 39.440634],
                    [20.070584, 39.46504],
                  ],
                ],
              },
              properties: {},
            },
          });

          map.current.addLayer({
            id: "PlayArea",
            type: "line",
            source: "area",
            layout: {
              "line-join": "round",
              "line-cap": "round",
              visibility: "none",
            },
            paint: {
              "line-color": "#84949e",
              "line-width": 2,
            },
          });

          setIsMapLoaded(true);
          console.log("Map loaded successfully");
        } catch (err) {
          setError("Failed to load map data");
          console.error("Error in map load event:", err);
        }
      });

      map.current.on("error", (err) => {
        setError("Mapbox error occurred");
        console.error("Mapbox error:", err);
      });
    } catch (err) {
      setError("Failed to initialize Mapbox");
      console.error("Mapbox initialization error:", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const toggleLayer = () => {
    if (!map.current) return;
    const visibility = layerVisible ? "none" : "visible";
    map.current.setLayoutProperty("PlayArea", "visibility", visibility);
    setLayerVisible(!layerVisible);
  };

  if (error) {
    return <div className="text-red-500 p-4 font-montserrat">{error}</div>;
  }

  return (
    <>
      {!isMapLoaded && <Preloader />}
      <NavigationMenu onToggleLayer={toggleLayer} isActive={layerVisible} />
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {isMapLoaded && (
        <>
          {zoom >= 9 &&
            beaches.map((beach, index) => (
              <BeachMarker
                key={`beach-${index}`}
                map={map.current}
                location={beach}
                onClick={handleLandmarkClick}
              />
            ))}
          {landmarks.map((landmark, index) => (
            <LandmarkMarker
              key={`landmark-${index}`}
              map={map.current}
              location={landmark}
              onClick={handleLandmarkClick}
            />
          ))}
          {zoom >= 12 &&
            warnings.map((warning, index) => (
              <WarningMarker
                key={`warning-${index}`}
                map={map.current}
                location={warning}
              />
            ))}
          {zoom > 15 &&
            anchorages.map((anchorage, index) => (
              <AnchorageMarker
                key={`anchorage-${index}`}
                map={map.current}
                location={anchorage}
              />
            ))}
          {hq.map((hqLocation, index) => (
            <HQMarker
              key={`hq-${index}`}
              map={map.current}
              location={hqLocation}
            />
          ))}
          <SeaPath
            map={map.current}
            isVisible={layerVisible}
            zoom={zoom}
            paths={seaPaths}
          />
        </>
      )}
      {selectedLandmark && (
        <Modal
          landmark={selectedLandmark}
          onClose={() => setSelectedLandmark(null)}
        />
      )}
    </>
  );
};
