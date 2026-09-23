import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf7f3",
        }}
      >
        <svg
          width="26"
          height="23"
          viewBox="0 0 132 116"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M66 5 L122 20 V56 C122 86 98 103 66 111 C34 103 10 86 10 56 V20 Z"
            stroke="#ff7a1a"
            strokeWidth="7"
          />
          <path d="M40 70 L56 88 L98 44" stroke="#e05d00" strokeWidth="13" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
