import { render, screen } from "@testing-library/react"
import { Text } from "./Text.ui"
import { textVariants } from "./Text.variants"

describe("Text component", () => {
  it("renders with default tag and variant", () => {
    render(<Text>Sample Text</Text>)
    const textElement = screen.getByRole("heading", { level: 2 })
    expect(textElement).toBeInTheDocument()
    expect(textElement.tagName).toBe("H2")
  })

  it("renders with specified tag and variant", () => {
    render(
      <Text
        tag="p"
        variant="p"
      >
        Sample Text
      </Text>,
    )
    const textElement = screen.getByText("Sample Text")
    expect(textElement).toBeInTheDocument()
    expect(textElement.tagName).toBe("P")
    expect(textElement).toHaveClass(textVariants.p)
  })

  it("applies lineClamp class when lineClamp prop is provided", () => {
    render(<Text lineClamp={3}>Sample Text</Text>)
    const textElement = screen.getByText("Sample Text")
    expect(textElement).toHaveClass("truncate")
    expect(textElement).toHaveClass("[-webkit-line-clamp:3]")
  })

  it("applies additional class names", () => {
    render(<Text className="extra-class">Sample Text</Text>)
    const textElement = screen.getByText("Sample Text")
    expect(textElement).toHaveClass("extra-class")
  })

  it("renders children correctly", () => {
    render(<Text>Sample Text</Text>)
    const textElement = screen.getByText("Sample Text")
    expect(textElement).toHaveTextContent("Sample Text")
  })
})
