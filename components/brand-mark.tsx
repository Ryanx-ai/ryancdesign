import Image from "next/image";

export function BrandMark({ size = 32 }: { size?: number }) {
  return <Image className="brand-mark" src="/brand/ryan-mark.svg" width={size} height={size} alt="RyanC maker mark" priority />;
}
