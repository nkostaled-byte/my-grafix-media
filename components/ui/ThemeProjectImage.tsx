import Image from "next/image";

export function ThemeProjectImage({
  src,
  alt,
  sizes,
  className = "object-contain p-6",
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  const darkSrc = src.replace("/images/projects/", "/images/projects/dark/");

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${className} dark:hidden`}
      />
      <Image
        src={darkSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
