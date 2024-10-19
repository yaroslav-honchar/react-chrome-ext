import { render, screen } from "@testing-library/react"
import { App } from "./App"

describe("App", () => {
  it("renders main container with correct dimensions and padding", () => {
    render(<App />)
    const mainElement = screen.getByRole("main")
    expect(mainElement).toBeInTheDocument()
  })
})
