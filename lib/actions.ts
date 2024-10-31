'use server'

import {OnApproveData} from "@paypal/paypal-js";

const API_KEY = process.env.API_KEY

type IPixel = {
    pixel: string;
    number: number;
    publicationDate: string;
}

export async function getpixels() {
    // Fetch data from external API
    const res = await fetch(
        "https://qzygh4aijl.execute-api.eu-west-1.amazonaws.com/prod/pixels",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY ?? '',
            },
        },
    )
    const pixel: IPixel = await res.json()
    // Pass data to the page via props
    return pixel.number
}

export const updatePixel = async (number: number) => {
    const now = new Date();
    const data = await fetch(
        "https://qzygh4aijl.execute-api.eu-west-1.amazonaws.com/prod/pixels",
        {
            method: "POST",
            body: JSON.stringify({
                number,
                publicationDate: now.toISOString(),
            }),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY ?? ''
            },
        },
    );
    const posts = await data.json();
    console.log("return", posts);
}


export const createOrder = async (number: number) => {
    const response = await fetch("https://qzygh4aijl.execute-api.eu-west-1.amazonaws.com/prod/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY ?? ''
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
           quantity: number
        }),
    });

    return await response.json();
}

export const captureOrder = async (data: OnApproveData ) => {
    const response = await fetch(
        `https://qzygh4aijl.execute-api.eu-west-1.amazonaws.com/prod/orders/${data.orderID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY ?? ''
            },
        }
    );

   return await response.json();
}
