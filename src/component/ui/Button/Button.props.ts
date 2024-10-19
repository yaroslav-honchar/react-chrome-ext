import type React from "react"
import type { buttonVariants } from "./Button.variants"

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface IButtonProps extends Partial<AnchorProps & ButtonProps> {
  variant?: keyof typeof buttonVariants
  tag?: "button" | "a"
}
