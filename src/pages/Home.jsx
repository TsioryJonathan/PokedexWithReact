import { PokeCardDisplayer } from "@/components/PokeCardDisplayer";
import React from "react";

function Home() {
  console.log("Home render");

  return (
    <div className="min-w-screen min-h-screen bg-background px-10 py-10">
      <PokeCardDisplayer offset={0} startIndex={0} />
    </div>
  );
}

export default Home;
