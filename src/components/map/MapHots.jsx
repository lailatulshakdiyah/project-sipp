"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer),{ ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer),{ ssr: false });
const LayersControl = dynamic(() => import("react-leaflet").then((mod) => mod.LayersControl), { ssr: false });
const BaseLayer = dynamic(() => import("react-leaflet").then((mod) => mod.LayersControl.BaseLayer), { ssr: false });

const DEFAULT_HEIGHT = "65vh";
const DEFAULT_CENTER = [-2.5489, 118.0149]; // Pusat Indonesia

const createColoredIcon = (color) => {
  const svgIcon = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10" fill="${color}" stroke="black" stroke-width="2" />
    </svg>
  `;
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
    iconSize: [25, 25],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const icons = {
  low: createColoredIcon("#52AF53"), // Hijau
  medium: createColoredIcon("#F9C132"), // Kuning
  high: createColoredIcon("#FF0000"), // Merah
};

export default function MapHots({ hotspots = [] }) {
  return (
    <>
      {/* <p className="text-sm mb-2">Total Hotspot Ditemukan: {hotspots.length}</p> */}

      <MapContainer
        key={hotspots.length}
        center={DEFAULT_CENTER}
        zoom={5}
        style={{ height: DEFAULT_HEIGHT, width: "100%" }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Street Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          <BaseLayer name="Google Street">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              attribution="Map &copy; <a href='https://maps.google.com/'>Google</a>"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={20}
            />
          </BaseLayer>
          <BaseLayer name="Esri Topo">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="Map &copy; <a href='https://arcgisonline.com/'>Esri</a>"
              maxZoom={20}
            />
          </BaseLayer>
          <BaseLayer name="Esri Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Map &copy; <a href='https://arcgisonline.com/'>Esri</a>"
              maxZoom={20}
            />
          </BaseLayer>
          <BaseLayer name="Google Hybrid">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              attribution="Map &copy; <a href='https://maps.google.com/'>Google</a>"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={20}
            />
          </BaseLayer>
          <BaseLayer name="Google Terrain">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
              attribution="Map &copy; <a href='https://maps.google.com/'>Google</a>"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              maxZoom={20}
            />
          </BaseLayer>
        </LayersControl>

        {/* Markers dari data */}
          {hotspots.map((spot, idx) => {
            
            const lat = parseFloat(spot.lat);
            const lon= parseFloat(spot.lon);
            if (isNaN(lat) || isNaN(lon)) return null;
            
            const confLevel = spot?.conf?.toLowerCase?.() || "low";
              

            return (
              <Marker
                key={idx}
                position={[lat, lon]}
                icon={icons[confLevel]}
              >
                <Popup>
                  <div className="text-sm space-y-1">
                    <p><strong>Waktu:</strong> {spot.detail?.date_hotspot || "-"}</p>
                    <p><strong>Provinsi:</strong> {spot.detail?.nama_provinsi || "-"}</p>
                    <p><strong>Kab/Kota:</strong> {spot.detail?.kabkota || "-"}</p>
                    <p><strong>Desa:</strong> {spot.detail?.desa || "-"}</p>
                    <p><strong>Level:</strong> {confLevel || "-"}</p>
                    <p><strong>Confidence:</strong> {spot.detail?.confidence || "-"}%</p>
                    <p><strong>Satelit:</strong> {spot.sat || "-"}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </>
  );
}
