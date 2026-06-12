import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

// ページでも使用しているアイコン画像(profile.avatar)をファビコンとして生成
export default async function Icon() {
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt=""
          width={256}
          height={256}
          style={{ borderRadius: "50%" }}
        />
      </div>
    ),
    size,
  );
}
