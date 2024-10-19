import cn from "classnames"
import type React from "react"
import { createElement } from "react"
import type { IButtonProps } from "./Button.props"
import { buttonVariants } from "./Button.variants"

export const Button: React.FC<IButtonProps> = ({
  tag = "button",
  variant = "primary",
  className,
  href,
  children,
  disabled,
  type = "button",
  ...rest
}) => {
  const isAnchor = tag === "a" || !!href

  const elementProps = {
    className: cn(buttonVariants[variant], className),
    role: isAnchor ? "link" : "button",
    href: isAnchor ? href : undefined,
    type: !isAnchor ? type : undefined,
    disabled: !isAnchor && disabled,
    onClick: isAnchor && disabled ? (e: React.MouseEvent) => e.preventDefault() : undefined,
    ...rest,
  }

  return createElement(isAnchor ? "a" : "button", elementProps, children)
}
