import type React from "react"
import type { buttonVariants } from "./Button.variants"

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Props for the Button component.
 *
 * @extends {Partial<AnchorProps & ButtonProps>}
 */
export interface IButtonProps extends Partial<AnchorProps & ButtonProps> {
  /**
   * Variant of the button, corresponding to a key in buttonVariants.
   *
   * @type {keyof typeof buttonVariants}
   */
  variant?: keyof typeof buttonVariants

  /**
   * HTML tag to be used for rendering the button.
   *
   * @type {"button" | "a"}
   */
  tag?: "button" | "a"
}
