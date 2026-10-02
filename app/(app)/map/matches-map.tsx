"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type MatchPin = {
  id: string;
  address: string;
  lat: number;
  lng: number;
  starts_at: string;
};

export default function MatchesMap({ matches }: { matches: MatchPin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: matches.length
        ? [matches[0].lng, matches[0].lat]
        : [-0.1278, 51.5074],
      zoom: 10,
    });

    const markers: mapboxgl.Marker[] = matches.map((m) => {
      const popup = new mapboxgl.Popup({ offset: 24 }).setHTML(
        `<a href="/matches/${m.id}" style="font-weight:600;">${m.address}</a><br/>${new Date(
          m.starts_at,
        ).toLocaleString("en-GB")}`,
      );
      return new mapboxgl.Marker({ color: "#ff7a1a" })
        .setLngLat([m.lng, m.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      markers.forEach((mk) => mk.remove());
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[28rem] w-full rounded-lg border border-line"
    />
  );
}
