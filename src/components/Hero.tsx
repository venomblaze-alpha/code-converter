"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import { Oxygen_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Convertor from "./Convertor";
import { Button } from "./ui/button";

const font = Oxygen_Mono({ subsets: ["latin"], weight: ["400"] });
const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="relative flex min-h-svh w-full flex-col items-center pt-20 md:pt-28 overflow-hidden rounded-lg border border-t-0 bg-background md:shadow-xl">
      <h1 className="pointer-events-none text-3xl whitespace-pre-wrap bg-gradient-to-b from-black to-zinc-400/80 bg-clip-text text-center md:text-6xl md:max-w-xl lg:max-w-3xl font-semibold lg:text-7xl leading-none text-transparent dark:from-white dark:to-zinc-600/80 tracking-tight">
        Transform{" "}
        <span
          className={cn(font.className, "md:text-7xl text-4xl text-primary/80")}
        >
          {"{"}Code{"/}"}
        </span>{" "}
        Effortlessly with AI
      </h1>
      <p className="md:text-xl pt-5 font-light px-4 text-pretty text-center text-muted-foreground max-w-prose">
        with Venom Converter , just paste your code and convert them in a go!
      </p>
      <Button
        asChild
        className="z-20 rounded-full mt-4 px-6"
        variant={"secondary"}
      >
        <a
          rel="noopener"
          href="https://github.com/venomblaze-alpha/"
          target="_blank"
        >
          Github
        </a>
      </Button>
      <Particles
        className="absolute inset-0"
        quantity={400}
        ease={80}
        color={color}
        refresh
      />
      <Convertor />
      <footer className="absolute bottom-2 right-10 border py-2 px-3 bg-green-100/60 dark:bg-green-950/60 border-emerald-700 rounded-md text-green-900 dark:text-green-200 z-[51]">
        made by{" "}
       venomblaze
      </footer>
    </div>
  );
};

export default ParticlesDemo;
