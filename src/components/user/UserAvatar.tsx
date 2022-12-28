import Image from "next/image";
import React from "react";

type Props = {
  userFullName: string;
  userProfileImg?: string;
  imagePx: number;
  hasRingStyle?: boolean;
  userId?: string;
};

function UserAvatar({
  userProfileImg,
  userFullName,
  imagePx,
  hasRingStyle,
  userId,
}: Props) {
  return (
    <div
      className={`relative h-${imagePx} w-${imagePx}  ${
        hasRingStyle ? "rounded-full ring-2 ring-secondary" : ""
      }`}
    >
      <Image
        className="rounded-full"
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        fill
        src={
          userProfileImg ??
          `https://avatars.dicebear.com/api/pixel-art/${
            userFullName ?? userId
          }.svg?background=%234f46e5`
        }
        alt={userFullName ?? `Profile img`}
      />
    </div>
  );
}

export default UserAvatar;
