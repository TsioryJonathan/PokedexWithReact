import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import assets from "@/assets/assets"; 

function BackgroundImage() {
  const isDark = useTheme();
  const backgroundImage = isDark
    ? assets.darkModeBg
    : assets.lightModeBg;

  return (
    <div
      className="absolute top-0 left-0 w-full min-h-full z-[-1] bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    />
  );
}

export default BackgroundImage;
