import React from "react";

export default function Image({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  [key: string]: unknown;
}) {
  return React.createElement("img", { src, alt, ...props });
}
