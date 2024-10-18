"use client";

import { heroSection } from "@/data/headerdata";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Define the type for the span ref
type SpanRef = React.MutableRefObject<HTMLSpanElement | null>;
gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const spanRef: SpanRef = useRef(null);

  useGSAP(() => {
    if (spanRef.current) {
      const text = spanRef.current.textContent || "";
      spanRef.current.innerHTML = "";

      text.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char === " " ? "\u00A0" : char;
        charSpan.className = "inline-block";
        spanRef.current?.appendChild(charSpan);
      });

      gsap.from(spanRef.current.querySelectorAll("span"), {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 1,
        ease: "power3.out",
        repeat: -1,
      });
    }

    const herodescT1 = gsap.timeline();
    herodescT1.from(".hero-desc", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.5,
    });
    return () => herodescT1.kill();
  }, []);

  return (
    <section className="container">
      <div className="hero-section  flex flex-col md:flex-row justify-between gap-10">
        <div className="left-hero-section max-w-[50rem] mt-20 xl:mt-32 flex flex-col items-center gap-5">
          <h1 className="hero-section-h1 text-4xl lg:text-5xl xl:text-6xl !leading-normal uppercase font-bold">
            {heroSection.title}{" "}
            <span ref={spanRef} className="hero-section-span text-primary">
              {heroSection.spantitle}
            </span>
          </h1>
          <p className="hero-desc leading-relaxed">{heroSection.description}</p>
        </div>
        <div className="right-hero-section">
          <Image
            className=" drop-shadow-orange  backdrop-blur-0 "
            src={heroSection.image}
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
