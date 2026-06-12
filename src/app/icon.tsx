import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const size = { width: 256, height: 256 };
export const contentType = "image/png";

// ページでも使用しているアイコン画像(profile.avatar)をファビコンとして生成
export default async function Icon() {
  const avatarResponse = await fetch(profile.avatar);
  const avatarType =
    avatarResponse.headers.get("content-type") ?? "image/png";
  const avatarBuffer = await avatarResponse.arrayBuffer();
  const avatarSrc = `data:${avatarType};base64,${Buffer.from(avatarBuffer).toString("base64")}`;

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
