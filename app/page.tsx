'use client'

import Image from "next/image";
import {useMemo, useState} from "react";

export default function Home() {
  const [pixels, setPixels] = useState<number>(1100)
  const pixelArray = useMemo(() => Array.from({length: pixels}, (_, i) => i), [pixels])

  const handleClick =(pixel = 1 )=> {
    setPixels(prevPixels => prevPixels === 1000*1000 ? prevPixels : prevPixels + pixel)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">Oscura il comunismo!</h1>
        <div className="flex">
          <button type="button"
                  onClick={() => handleClick(1)}
                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Compra un pixel
          </button>

          <button type="button"
                  onClick={() => handleClick(100)}
                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Compra 100 pixel
          </button>
          <button type="button"
                  onClick={() => handleClick(1000)}
                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Compra 1000 pixel
          </button>
        </div>
        <div>
          <div style={{width: 1000, height: 1000, position: 'relative', border: "1px solid red"}}>
            {pixelArray.map(pixel => {
                const row = Math.ceil(pixel / 1000) -1;
              const col = (pixel % 999);

              return (<div key={pixel}
                           style={{
                             position: 'absolute',
                       top: row,
                       left: col,
                       width: 1, height: 1,
                       background: "#000"
                     }
                }
                />)
            })}
            <Image
                src="/pixel_test.png"
                alt="Example Image"
                width={1000}
                height={1000}

            />
          </div>
        </div>
      </main>
    </div>
  );
}
