import { pagesService } from "../../services/pages.service"
import type { IPage } from "../../types/page.type"
import { render, screen } from "@testing-library/react"
import { SavedPagesList } from "./SavedPagesList.ui"

jest.mock("../../services/pages.service")

describe("SavedPagesList", () => {
  const mockPages: IPage[] = [
    { href: "https://example.com", icon: "https://example.com/favicon.ico", title: "Example" },
    { href: "https://test.com", icon: "https://test.com/favicon.ico", title: "Test" },
  ]

  beforeEach(() => {
    ;(pagesService.getAll as jest.Mock).mockResolvedValue(mockPages)
  })

  it("renders the list of saved pages", async () => {
    render(<SavedPagesList />)
    const pageItems = await screen.findAllByRole("listitem")
    expect(pageItems).toHaveLength(mockPages.length)
  })

  it("renders the correct page titles", async () => {
    render(<SavedPagesList />)
    for (const page of mockPages) {
      expect(await screen.findByText(page.title)).toBeInTheDocument()
    }
  })

  it("renders a message when there are no saved pages", async () => {
    ;(pagesService.getAll as jest.Mock).mockResolvedValue([])
    render(<SavedPagesList />)
    expect(await screen.findByText("Saved pages")).toBeInTheDocument()
  })
})
