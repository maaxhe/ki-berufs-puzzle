import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt =
  "KI-Berufs-Puzzle – Was kann KI in deinem Beruf, und was bleibt menschlich?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8ff",
          color: "#231c4a",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#5b43b8" }}>
          KI-Berufs-Puzzle
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          Was in deinem Beruf kann KI – und was bleibt menschlich?
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 30 }}>
          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              background: "#fbe7d6",
              color: "#5b43b8",
            }}
          >
            Mensch
          </div>
          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              background: "#dcebf8",
              color: "#33484d",
            }}
          >
            KI
          </div>
          <div style={{ display: "flex", color: "#6a6258", marginLeft: "auto" }}>
            {SITE_URL.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
