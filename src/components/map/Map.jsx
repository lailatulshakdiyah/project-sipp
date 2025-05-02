"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "@/assets/img/marker-icon.png";
//import DateInput from '@/components/card/DateInput'
import { useState } from "react";


const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });


const LayersControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.LayersControl), { ssr: false }
);
const BaseLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.LayersControl.BaseLayer), { ssr: false }
);

const DEFAULT_HEIGHT = "65vh";
const DEFAULT_CENTER = [-2.5489, 118.0149]; // Pusat Indonesia

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export default function Map() {
  return (
    <MapContainer center={DEFAULT_CENTER} zoom={5} style={{ height: DEFAULT_HEIGHT, width: "100%" }}>
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
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
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
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={20}
          />
        </BaseLayer>
        <BaseLayer name="Google Terrain">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
            attribution="Map &copy; <a href='https://maps.google.com/'>Google</a>"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={20}
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};