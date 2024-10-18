import { pagesService } from "./services/pages.service"
import type { IPage } from "./types/page.type"
import { render, screen } from "@testing-library/react"
import { App } from "./App"

jest.mock("./services/pages.service")

const mockPages: IPage[] = [
  { href: "https://example.com", icon: "/images/icon.png", title: "Example" },
]

describe("App", () => {
  beforeEach(() => {
    ;(pagesService.getAll as jest.Mock).mockResolvedValue(mockPages)
  })

  it("renders pages", async () => {
    render(<App />)

    expect(await screen.findByText("Pages")).toBeInTheDocument()
    expect(await screen.findByAltText("Example")).toBeInTheDocument()
  })
})
