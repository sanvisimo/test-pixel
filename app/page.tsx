"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SimpleDialog } from "@/components/SimpleDialog";
import { spiralMatrix } from "@/lib/utils";
import { getpixels, updatePixel } from "@/lib/actions";
import kamala from "./kamala-harris-and-joe-biden-as-a-married-couple.webp";
import { useResizeObserver } from "usehooks-ts";

const DEFAULT_DIMENSION = 10;

export default function Home() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });
  const [currentPixel, setCurrentPixel] = useState(0);

  useEffect(() => {
    const updateViews = async () => {
      const updatedViews = await getpixels();
      setCurrentPixel(updatedViews);
    };

    updateViews();
  }, []);

  const deflection = useMemo(() => {
    return (width * DEFAULT_DIMENSION) / 1000;
  }, [width]);

  const matrix = useMemo(() => spiralMatrix(1000 / DEFAULT_DIMENSION), []);
  const used = useMemo(() => {
    const colors: Array<Array<number>> = [];

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] <= currentPixel) {
          colors.push([y, x]);
        }
      }
    }

    return colors;
  }, [matrix, currentPixel]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (numbers: number) => {
    setOpen(false);
    const total = currentPixel + numbers;
    await updatePixel(total);
    setCurrentPixel(total);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col lg:flex-row gap-4 row-start-2 items-center sm:items-start w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl bg-gradient-to-r from-red-500 via-white to-blue-500 inline-block text-transparent bg-clip-text">
            LET’S MAKE THEM GO AWAY!
          </h1>
          <p>let’s cancel them! buy one red pixel to erase this image</p>
          <Image
            width={300}
            height={169}
            src="/usa-american-flag.gif"
            unoptimized
            className="attachment-medium size-medium"
            alt="U.S.A."
          />
          <div className="flex">
            <button
              type="button"
              onClick={handleClickOpen}
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ERASE THEM!
            </button>
            <SimpleDialog open={open} onClose={handleClose} />
          </div>
        </div>
        <div className="w-full">
          <div ref={ref} className="relative" style={{ width: "100%" }}>
            {used.map((pixel) => {
              const row = pixel[0] * deflection;
              const col = pixel[1] * deflection;

              return (
                <div
                  key={`position-${pixel[0]}-${pixel[1]}`}
                  style={{
                    position: "absolute",
                    top: row,
                    left: col,
                    width: deflection,
                    height: deflection,
                    background: "#F00",
                  }}
                />
              );
            })}
            <Image
              src={kamala}
              alt="Erase them"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
