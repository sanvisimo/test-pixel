import Page from "@/components/Page";

type IPixel = {
  pixel: string;
  number: number;
  publicationDate: string;
}

async function getpixels() {
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
  return pixel
}

export default async function Home() {
  const data = await getpixels()

  return <Page dbPixel={data.number} />
}

