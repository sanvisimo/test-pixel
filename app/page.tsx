'use client'

import Image from "next/image";
import { useState} from "react";
import {SimpleDialog} from "@/components/SimpleDialog";

function getRandomIndex(usedIndexs: number[], maxIndex: number) {
  const min = 0;
  const max = maxIndex - 1;
  let index = Math.floor(Math.random()*(max-min+1)+min);

  return usedIndexs.includes(index) ? index++ : index
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [pixels, setPixels] = useState<number[]>([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const generateNumbers = async (numbers: number) => {
    let p = [...pixels]
      for(let i = 0; i < numbers; i++) {
      console.log('p', p)
      const index = getRandomIndex(p, 1000000);
      p = [...p, index];
    }

      setPixels(p)
  }

  const handleClose = (numbers: number) => {
    setOpen(false);
    console.log('pixels', numbers)
    generateNumbers(numbers)
  };

  console.log('poixe', pixels)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex  gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-8">
        <h1 className="text-5xl">Cancel wokiness!</h1>
        <div className="flex">
          <button type="button"
                  onClick={handleClickOpen}
                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Buy pixels
          </button>
          <SimpleDialog
              open={open}
              onClose={handleClose}
          />
        </div>
        </div>
        <div>
          <div style={{width: 1000, height: 1000, position: 'relative', border: "1px solid red"}}>
            {pixels.map(pixel => {
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
                src="/digital_woke.webp"
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
