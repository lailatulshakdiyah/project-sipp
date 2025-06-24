"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";

// const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
// // const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
// const LayersControl = dynamic(
//   () => import("react-leaflet").then((mod) => mod.LayersControl), { ssr: false }
// );
const BaseLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.LayersControl.BaseLayer), { ssr: false }
);

const DEFAULT_CENTER = [-2.5489, 118.0149]; // Pusat Indonesia
const DEFAULT_HEIGHT = "65vh";

const aksiColorMap = {
  "Patroli Mandiri": "#006BFF",
  "Patroli Rutin": "#F9C132",
  "Patroli Terpadu": "#52AF53",
  "Pemadaman": "#FF0000",
}

const createCustomIcon = (color) => {
  const iconMarkup = renderToStaticMarkup(
    <FaMapMarkerAlt size={35} color={color} />
  );

  return L.divIcon({
    html: iconMarkup,
    className: "", 
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
}

const getCustomMarkerIcon = (aksi) => {
  const color = aksiColorMap[aksi];
  return color ? createCustomIcon(color) : null;
};

export default function Map({ markerData = [], flyToRef }) {
  const mapRef = useRef();
  const markerRefs = useRef({});

  useEffect(() => {
    if (flyToRef) {
      flyToRef.current = (lat, lng, kodeLaporan) => {
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lng], 10);
        }

        const marker = markerRefs.current[kodeLaporan];
        if (marker) {
          setTimeout(() => {
            marker.openPopup();
          }, 600);
        }
      };
    }
  }, [flyToRef]);

  return (
    <>
      {/* <p>Total marker: {markerData.length}</p> */}
      <MapContainer ref={mapRef} center={DEFAULT_CENTER} zoom={5} style={{ height: DEFAULT_HEIGHT, width: "100%" }}>
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

        {/* Render marker berdasarkan data yang di-fetch */}
        {markerData.map((item, index) => (
          item.lat != null && item.lng != null && (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={getCustomMarkerIcon(item.aksi)}
              ref={(el) => {
                if (el) {
                  markerRefs.current[item.kode_laporan] = el;
                }
              }}
            >
              <Popup>
                <div className="text-sm space-y-2">
                  <p className="text-center font-bold mb-2">{item?.nama || "-"}</p>
                  <p><strong>Kode Laporan:</strong>  {item?.kode_laporan || "-"}</p>
                  <p><strong>Kategori:</strong>  {item?.kegiatan || "-"}</p>
                  <p><strong>Latitude:</strong>  {item?.lat || "-"}</p>
                  <p><strong>Longitude:</strong>  {item?.lng || "-"}</p>
                  <p><strong>Daops:</strong>  {item?.nama_daops || "-"}</p>
                  <p><strong>Ketua Regu:</strong>  {item?.ketua_regu || "-"}</p>
                </div>
                
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </>
  );
};