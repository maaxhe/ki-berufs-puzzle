import { ImageResponse } from "next/og";

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
          background: "#f5f4f1",
          color: "#262019",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#8a3a2c" }}>
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
              background: "#efe1dc",
              color: "#8a3a2c",
            }}
          >
            Mensch
          </div>
          <div
            style={{
              display: "flex",
              padding: "14px 28px",
              background: "#e7eaea",
              color: "#33484d",
            }}
          >
            KI
          </div>
          <div style={{ display: "flex", color: "#6a6258", marginLeft: "auto" }}>
            jobs.coxilab.de
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
