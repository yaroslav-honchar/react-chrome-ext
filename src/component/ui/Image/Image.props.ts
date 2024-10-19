import type React from "react"

/**
 * Interface for Image component props.
 *
 * @extends {React.ImgHTMLAttributes<HTMLImageElement>}
 */
export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Fallback source URL or boolean to indicate if a fallback image should be used.
   *
   * @type {string | boolean}
   */
  fallbackSrc?: string | boolean
}
