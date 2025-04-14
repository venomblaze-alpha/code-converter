import Hero from "@/components/Hero";
import { Spotlight } from "@/components/ui/Spotlight";
import React from "react";

const page = () => {
  return (
    <>
      <Spotlight
        className="-top-40 left-10 md:left-80 md:-top-20"
        fill="#c9c9c9"
      />
      <Hero />
    </>
  );
};

export default page;
