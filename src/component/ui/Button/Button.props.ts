import type React from "react"
import type { buttonVariants } from "./Button.variants"

export type AnchorPropsType = React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Props for the Button component.
 *
 * @extends {Partial<AnchorProps & ButtonProps>}
 */
export interface IButtonProps extends Partial<AnchorPropsType & ButtonPropsType> {
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
