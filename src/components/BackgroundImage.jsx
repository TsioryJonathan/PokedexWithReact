import assets from "@/assets/assets";
import useDarkTheme from "@/hooks/useDarkTheme";
import React from "react";

function BackgroundImage() {
  const isDark = useDarkTheme();
  const backgroundImage = isDark
    ? assets.dark_background_ultraHD
    : assets.light_background_ultraHD;

  return (
    <div
      className="absolute top-0 left-0 w-full min-h-full z-[-1] bg-cover bg-no-repeat "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    />
  );
}

export default BackgroundImage;
