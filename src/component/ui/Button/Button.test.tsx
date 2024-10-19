import { fireEvent, render, screen } from "@testing-library/react"
import { Button } from "./Button.ui"
import { buttonVariants } from "./Button.variants"

describe("Button component", () => {
  it("renders a button element by default with children correctly", () => {
    render(<Button>Click me</Button>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.tagName).toBe("BUTTON")
    expect(buttonElement).toHaveTextContent("Click me")
  })

  it("renders an anchor element when tag is 'a'", () => {
    render(
      <Button
        tag="a"
        href="https://example.com"
      >
        Click me
      </Button>,
    )
    const anchorElement = screen.getByRole("link")
    expect(anchorElement).toBeInTheDocument()
    expect(anchorElement.tagName).toBe("A")
    expect(anchorElement).toHaveAttribute("href", "https://example.com")
  })

  it("applies the correct variant class", () => {
    render(<Button variant="secondary">Click me</Button>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toHaveClass(buttonVariants.secondary)
  })

  it("applies additional class names", () => {
    render(<Button className="extra-class">Click me</Button>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toHaveClass("extra-class")
  })

  it("disables the button when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>)
    const buttonElement = screen.getByRole("button")
    expect(buttonElement).toBeDisabled()
  })

  it("prevents default action when anchor is disabled", () => {
    const handleClick = jest.fn((e) => e.preventDefault())

    render(
      <Button
        tag="a"
        href="https://example.com"
        disabled
        onClick={handleClick}
      >
        Click me
      </Button>,
    )
    const anchorElement = screen.getByRole("link")
    fireEvent.click(anchorElement)
    expect(handleClick).toHaveBeenCalled()
    expect(anchorElement).toHaveAttribute("href", "https://example.com")
  })
})
