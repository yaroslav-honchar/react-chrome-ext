import { fireEvent, render, screen } from "@testing-library/react"
import { Image } from "./Image.ui"

describe("Image component", () => {
  it("renders with given src and alt attributes", () => {
    render(
      <Image
        src="/img/sample.png"
        alt="Sample Image"
      />,
    )
    const imgElement = screen.getByRole("img")
    expect(imgElement).toHaveAttribute("src", "/img/sample.png")
    expect(imgElement).toHaveAttribute("alt", "Sample Image")
  })

  it("renders with default alt attribute when alt is not provided", () => {
    render(<Image src="/img/sample.png" />)
    const imgElement = screen.getByRole("img")
    expect(imgElement).toHaveAttribute("alt", "image")
  })

  it("uses fallbackSrc when image fails to load", () => {
    render(
      <Image
        src="/img/invalid.png"
        fallbackSrc="/img/fallback.png"
      />,
    )
    const imgElement = screen.getByRole("img")
    fireEvent.error(imgElement)
    expect(imgElement).toHaveAttribute("src", "/img/fallback.png")
  })

  it("uses default fallback image when both src and fallbackSrc fail to load", () => {
    render(
      <Image
        src="/img/invalid.png"
        fallbackSrc="/img/invalid-fallback.png"
      />,
    )
    const imgElement = screen.getByRole("img")
    fireEvent.error(imgElement)
    fireEvent.error(imgElement)
    expect(imgElement).toHaveAttribute("src", "/img/icon-48.png")
  })

  it("applies the correct class names", () => {
    render(
      <Image
        src="/img/sample.png"
        alt="Sample Image"
        className="custom-class"
      />,
    )
    const imgElement = screen.getByRole("img")
    expect(imgElement).toHaveClass("custom-class")
  })

  it("calls onError callback when image fails to load", () => {
    const onErrorMock = jest.fn()
    render(
      <Image
        src="/img/invalid.png"
        onError={onErrorMock}
      />,
    )
    const imgElement = screen.getByRole("img")
    fireEvent.error(imgElement)
    expect(onErrorMock).toHaveBeenCalled()
  })
})
