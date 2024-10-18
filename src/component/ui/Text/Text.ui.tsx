import cn from "classnames"
import type React from "react"
import { createElement } from "react"
import type { ITextProps } from "./Text.props"
import { variants } from "./Text.variants"

export const Text: React.FC<ITextProps> = ({
  variant = "h2",
  tag = "h2",
  children,
  lineClamp,
  className,
  ...rest
}) => {
  return createElement(
    tag,
    {
      className: cn(variants[variant], className, {
        [`truncate [-webkit-line-clamp: ${lineClamp}]`]: lineClamp,
      }),
      ...rest,
    },
    children,
  )
}
