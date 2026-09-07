"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// High-resolution real luxury interior photography from LUXiHOME projects
const LUXIHOME_INTERIOR_IMAGES = [
  "/pictures.testimonals/residential.pic/photo_1_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_2_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_3_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_4_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_5_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_6_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_7_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_8_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_9_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_10_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_11_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_12_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_13_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_14_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_15_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/residential.pic/photo_16_2026-09-06_14-27-28.jpg",
  "/pictures.testimonals/salt.lake.work/photo_1_2026-09-04_15-01-37.jpg",
  "/pictures.testimonals/salt.lake.work/photo_2_2026-09-04_15-01-37.jpg",
  "/pictures.testimonals/salt.lake.work/photo_3_2026-09-04_15-01-37.jpg",
  "/pictures.testimonals/salt.lake.work/photo_4_2026-09-04_15-01-37.jpg",
  "/pictures.testimonals/salt.lake.work/photo_5_2026-09-04_15-01-37.jpg",
  "/pictures.testimonals/salt.lake.work2/photo_1_2026-09-04_15-17-45.jpg",
  "/pictures.testimonals/salt.lake.work2/photo_2_2026-09-04_15-17-45.jpg",
  "/pictures.testimonals/salt.lake.work2/photo_3_2026-09-04_15-17-45.jpg",
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
  title?: string;
}

const ImageCard = ({ src, onLoad, title }: ImageCardProps) => {
  return (
    <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-[#0B1118] border border-white/10 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d group">
      <img
        src={src}
        alt={title || "LUXiHOME Interior Asset"}
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-xs uppercase tracking-widest text-[#DAD0C1] font-medium font-sans">
          LUXiHOME Interior Archive
        </span>
      </div>
    </div>
  );
};

interface ParallaxGalleryProps {
  images?: string[];
  title?: string;
  subtitle?: string;
}

export default function Component({
  images = LUXIHOME_INTERIOR_IMAGES,
  title = "THE INTERIOR VISION",
  subtitle = "Bespoke Artisanal Craftsmanship Across Kolkata",
}: ParallaxGalleryProps) {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const col1Base = images.filter((_, i) => i % 4 === 0);
    const col2Base = images.filter((_, i) => i % 4 === 1);
    const col3Base = images.filter((_, i) => i % 4 === 2);
    const col4Base = images.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, [images]);

  // LINKED SCROLL: Now tells Framer Motion exactly which div is doing the scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["92vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["85vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["32px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["2px", "0px"]);

  // 3D Matrix animations (Mobile tuned angles for natural perspective)
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-35, -5]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [20, 2]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [10, 1]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-600, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-35%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-35%", "8%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-35%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-25%", "15%"]);

  return (
    <div 
      ref={scrollWrapperRef}
      className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#070B0E] touch-pan-y"
    >
      <section
        ref={containerRef}
        className="relative w-full h-[500vh] sm:h-[600vh] bg-[#070B0E] text-white font-sans selection:bg-[#C5A880] selection:text-black"
      >
        <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          <motion.div
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "rgba(197, 168, 128, 0.25)",
            }}
            className="relative bg-[#070B0E] overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d shadow-2xl"
          >
            {/* Header Overlay */}
            <div className="absolute top-8 sm:top-12 left-0 right-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
              <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#C5A880] font-semibold mb-2">
                LUXiHOME Bespoke Portfolio
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.18em] uppercase text-white font-serif">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-[#DAD0C1]/75 tracking-wider mt-2 max-w-md">
                {subtitle}
              </p>
            </div>

            <div
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {/* Ambient Shadow Box Masking */}
              <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_100px_150px_-50px_rgba(7,11,14,1),inset_0_-100px_150px_-50px_rgba(7,11,14,1)]" />
              <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_120px_0_120px_-50px_rgba(7,11,14,1),inset_-120px_0_120px_-50px_rgba(7,11,14,1)]" />

              {/* Parallax Image Grid Matrix */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
                className="flex gap-3 sm:gap-4 md:gap-6 justify-center items-center w-[135vw] sm:w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
              >
                <motion.div style={{ y: yCol1 }} className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[28vw] sm:w-[22vw] min-w-[160px] sm:min-w-[200px] pointer-events-auto">
                  {colMedia.col1.map((src, index) => (
                    <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol2 }} className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[28vw] sm:w-[22vw] min-w-[160px] sm:min-w-[200px] pointer-events-auto">
                  {colMedia.col2.map((src, index) => (
                    <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol3 }} className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[28vw] sm:w-[22vw] min-w-[160px] sm:min-w-[200px] pointer-events-auto">
                  {colMedia.col3.map((src, index) => (
                    <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>

                <motion.div style={{ y: yCol4 }} className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-[28vw] sm:w-[22vw] min-w-[160px] sm:min-w-[200px] pointer-events-auto">
                  {colMedia.col4.map((src, index) => (
                    <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
