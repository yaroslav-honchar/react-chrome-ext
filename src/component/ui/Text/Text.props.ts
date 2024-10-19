import type React from "react"
import type { textVariants } from "./Text.variants"

/**
 * Props for the Text component.
 *
 * @extends {React.HTMLProps<HTMLDivElement>}
 */
export interface ITextProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Variant of the text, corresponding to a key in textVariants.
   *
   * @type {keyof typeof textVariants}
   */
  variant?: keyof typeof textVariants

  /**
   * HTML tag to be used for rendering the text.
   *
   * @type {"p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"}
   */
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  /**
   * Number of lines to clamp the text to.
   *
   * @type {number}
   */
  lineClamp?: number
}
