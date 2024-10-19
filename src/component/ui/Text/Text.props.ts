import type React from "react"
import type { textVariants } from "./Text.variants"

export interface ITextProps extends React.HTMLProps<HTMLDivElement> {
  variant?: keyof typeof textVariants
  tag?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  lineClamp?: number
}
