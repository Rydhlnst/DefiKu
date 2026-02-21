"use client";

import Avatar from "boring-avatars";
import { cn } from "@/lib/utils";

interface NotionAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

// Notion-style color palette
const notionColors = [
  "#E8F5E9", // Light green
  "#E3F2FD", // Light blue
  "#FFF3E0", // Light orange
  "#F3E5F5", // Light purple
  "#E0F2F1", // Light teal
  "#FFF8E1", // Light yellow
  "#FBE9E7", // Light red
  "#ECEFF1", // Light gray
];

// Generate consistent color based on name
function getColorFromName(name: string): string {
  const colorIndex = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % notionColors.length;
  return notionColors[colorIndex];
}

/**
 * Notion-style Avatar with initials (original style)
 */
export function NotionAvatar({ name, size = 24, className }: NotionAvatarProps) {
  const bgColor = getColorFromName(name);
  
  // Get initials (max 2 characters)
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-md font-semibold text-foreground/70",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size * 0.4,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

/**
 * Notion-style Face Avatar using dicebear API
 * This generates cute cartoon faces similar to Notion's style
 */
export function NotionFaceAvatar({ name, size = 40, className }: NotionAvatarProps) {
  // Use dicebear notionists style - this is the exact style Notion uses
  const seed = encodeURIComponent(name);
  const svgUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=${getColorFromName(name).replace('#', '')}`;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: getColorFromName(name),
      }}
    >
      <img
        src={svgUrl}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full"
      />
    </div>
  );
}

/**
 * Alternative: Using boring-avatars with beam variant
 * Creates geometric patterns that resemble abstract faces
 */
export function BoringNotionAvatar({ name, size = 24, className }: NotionAvatarProps) {
  return (
    <div className={cn("rounded-md overflow-hidden", className)}>
      <Avatar
        size={size}
        name={name}
        variant="beam"
        colors={["#E8F5E9", "#E3F2FD", "#FFF3E0", "#F3E5F5", "#E0F2F1"]}
      />
    </div>
  );
}

/**
 * Fun emoji-style avatar using dicebear fun-emoji
 */
export function FunEmojiAvatar({ name, size = 40, className }: NotionAvatarProps) {
  const seed = encodeURIComponent(name);
  const svgUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}`;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={svgUrl}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full"
      />
    </div>
  );
}
