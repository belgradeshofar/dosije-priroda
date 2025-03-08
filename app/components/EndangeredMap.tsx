"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../../lib/supabaseClient";
import styles from "./EndangeredMap.module.css";
import { LatLngExpression } from "leaflet";

// 📌 Pomoćna komponenta za postavljanje centra mape
function SetViewOnLoad({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [map, center]);
  return null;
}

export default function EndangeredMap() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const center: LatLngExpression = [44.7866, 20.4489]; // Beograd kao centar mape

  useEffect(() => {
    async function fetchIncidents() {
      const { data, error } = await supabase.from("ecological_incidents").select("*");
      if (error) {
        console.error("Greška prilikom učitavanja podataka:", error);
      } else {
        setIncidents(data || []);
      }
    }
    fetchIncidents();
  }, []);

  return (
    <MapContainer center={center} zoom={6} className={styles.map}>
      <SetViewOnLoad center={center} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {incidents.map((incident) => (
        <Marker key={incident.id} position={[incident.latitude, incident.longitude] as LatLngExpression}>
          <Popup>
            <strong>{incident.title}</strong> <br />
            {incident.description} <br />
            {incident.image_url && (
              <img src={incident.image_url} alt={incident.title} className={styles.popupImage} />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
