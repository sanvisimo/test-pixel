'use client'

import Image from "next/image";
import { useMemo, useState} from "react";
import {SimpleDialog} from "@/components/SimpleDialog";
import { spiralMatrix} from "@/lib/utils";
import {updatePixel} from "@/lib/actions";


const DEFAULT_DIMENSION = 10

type PageProps = {
    dbPixel: number
}

export default function Page({dbPixel}: PageProps ) {
    const [open, setOpen] = useState(false);
    const [currentPixel, setCurrentPixel] = useState(dbPixel)

    const matrix = useMemo(() => spiralMatrix(1000 / DEFAULT_DIMENSION), [])
    const used = useMemo(() => {
        const colors: Array<Array<number>> = []

        for (let y = 0; y <matrix.length; y++) {
            for(let x =0; x <matrix[y].length; x++) {
                if (matrix[y][x] <= currentPixel) {
                    colors.push([y,x])
                }
            }
        }

        return colors
    },[matrix,currentPixel])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (numbers: number) => {
        setOpen(false);
        const total = currentPixel + numbers
        await updatePixel(total)
        setCurrentPixel(total)
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="flex  gap-8 row-start-2 items-center sm:items-start">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl bg-gradient-to-r from-red-500 via-white to-blue-500 inline-block text-transparent bg-clip-text">LET’S
                        MAKE THEM GO AWAY!</h1>
                    <Image width={300} height={169}
                           src="/usa-american-flag.gif"
                           unoptimized
                           className="attachment-medium size-medium" alt="U.S.A."/>
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
                        {used.map(pixel => {
                            const row = (pixel[0]*DEFAULT_DIMENSION) + 1
                            const col = (pixel[1]*DEFAULT_DIMENSION) + 1

                            return (<div key={`position-${pixel[0]}-${pixel[1]}`}
                                         style={{
                                             position: 'absolute',
                                             top: row,
                                             left: col,
                                             width: DEFAULT_DIMENSION, height: DEFAULT_DIMENSION,
                                             background: "#1A00FF"
                                         }
                                         }
                            />)
                        })}
                        <Image
                            src="/kamala-harris-and-joe-biden-as-a-married-couple.webp"
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
