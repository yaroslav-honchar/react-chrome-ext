import React, { useRef } from "react"
import type { IImageProps } from "./Image.props"

export const Image: React.FC<IImageProps> = ({
  src,
  alt = "image",
  fallbackSrc,
  className,
  onError,
  ...rest
}) => {
  const isFallbackUsed = useRef<boolean>(false)

  const onImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (typeof fallbackSrc === "string" && !isFallbackUsed.current) {
      event.currentTarget.src = fallbackSrc
      isFallbackUsed.current = true
    } else {
      event.currentTarget.src = "/img/icon.svg"
    }

    onError?.(event)
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={onImageError}
      {...rest}
    />
  )
}
