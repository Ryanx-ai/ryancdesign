// Reproducible editorial covers. Source logos are preserved, never retraced.
import fs from "node:fs/promises";
import sharp from "sharp";
const root = new URL("../public/content/projects/", import.meta.url);
const typeCover = (title, subtitle, background, ink, accent, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000"><rect width="1600" height="1000" fill="${background}"/><path d="M100 120H1500" stroke="${ink}" opacity=".2"/><text x="100" y="185" fill="${ink}" font-family="Helvetica,Arial,sans-serif" font-size="24" letter-spacing="3">${subtitle}</text>${extra}<text x="95" y="655" fill="${ink}" font-family="Helvetica,Arial,sans-serif" font-size="${title.length>9 ? 190 : 245}" font-weight="700" letter-spacing="-14">${title}</text><path d="M100 815H1500" stroke="${ink}" opacity=".2"/><circle cx="1480" cy="880" r="12" fill="${accent}"/></svg>`;
for (const [slug,title,subtitle,bg,ink,accent,extra] of [
  ["phings","phings","SMALL LIFE / OPEN POSSIBILITIES","#e9eddf","#293b2e","#7a915e",'<circle cx="1320" cy="450" r="50" fill="#7a915e"/><circle cx="1380" cy="495" r="30" fill="#b0b99a"/>'],
  ["eureka","eureka","CURRICULUM / MADE REUSABLE","#152541","#f1f5fc","#6c9ee9",'<path d="M1250 350H1450V550H1250Z M1300 400H1500V600" fill="none" stroke="#6c9ee9" stroke-width="3"/>'],
]) {
  const dir=new URL(`${slug}/`,root); await fs.mkdir(dir,{recursive:true});
  const svg=typeCover(title,subtitle,bg,ink,accent,extra);
  await fs.writeFile(new URL("cover.svg",dir),svg);
  await sharp(Buffer.from(svg)).png().toFile(new URL("cover.png",dir).pathname);
}
await sharp(new URL("pufflet/identity-5.svg",root).pathname).resize(1600,1000,{fit:"cover"}).png().toFile(new URL("pufflet/cover.png",root).pathname);
const luna=await sharp(new URL("luna/lockup.png",root).pathname).trim().resize({width:1000,height:420,fit:"inside"}).toBuffer();
await sharp(new URL("luna/lockup.png",root).pathname).trim().png().toFile(new URL("luna/lockup-tight.png",root).pathname);
await sharp({create:{width:1600,height:1000,channels:4,background:"#2f2a44"}}).composite([{input:luna,gravity:"centre"}]).png().toFile(new URL("luna/cover.png",root).pathname);
console.log("Four editorial covers exported.");
