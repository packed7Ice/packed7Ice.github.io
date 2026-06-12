import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const alt = "依川 愛瀬 | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ビルド時に Google Fonts から必要なグリフだけ取得する (satori は woff2 非対応のため TTF を取る)
async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );
  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) return await response.arrayBuffer();
  }
  throw new Error("failed to load font data");
}

export default async function OgImage() {
  const text = `${profile.nameJa}${profile.nameEn}PORTFOLIO `;
  const notoSansJp = await loadGoogleFont("Noto+Sans+JP:wght@700", text);
  const avatarBuffer = await fetch(profile.avatar).then((res) =>
    res.arrayBuffer(),
  );
  const avatarSrc = `data:image/png;base64,${Buffer.from(avatarBuffer).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #eaeff3 0%, #fffffe 55%, #a0d8ef 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt=""
          width={280}
          height={280}
          style={{
            borderRadius: "50%",
            border: "10px solid #ffffff",
            boxShadow: "0 12px 32px rgba(29, 80, 162, 0.25)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 72,
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: "#1d50a2",
              letterSpacing: 14,
            }}
          >
            PORTFOLIO
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: "#1d50a2",
              marginTop: 8,
            }}
          >
            {profile.nameJa}
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#64748b",
              letterSpacing: 10,
              marginTop: 14,
            }}
          >
            {profile.nameEn}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              width: 240,
              height: 12,
              background: "#a0d8ef",
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: notoSansJp,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
