"use server";

import bwipjs from "@bwip-js/node";

export async function generateQrcode({ text }: { text: string }) {
  const png = await bwipjs.toBuffer({
    bcid: "qrcode",
    text: text,
    scale: 3,
    includetext: false,
  });

  return `data:image/png;base64,${png.toString("base64")}`;
}
