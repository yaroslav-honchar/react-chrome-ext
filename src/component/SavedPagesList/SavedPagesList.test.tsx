import { act } from "react"
import { pagesService } from "../../services/pages.service"
import type { IPageGroup } from "../../types/page.type"
import { render, screen } from "@testing-library/react"
import { SavedPagesList } from "./SavedPagesList.ui"

jest.mock("../../services/pages.service")

describe("SavedPagesList", () => {
  const mockGroups: IPageGroup[] = [
    {
      title: "Group 1",
      pages: [
        { href: "https://example.com", title: "Example" },
        { href: "https://test.com", title: "Test" },
      ],
      icon: "https://example.com/favicon.ico",
      originUrl: "https://example.com",
    },
  ]

  beforeEach(() => {
    ;(pagesService.getAll as jest.Mock).mockResolvedValue(mockGroups)
  })

  it("renders the title 'Saved pages'", async () => {
    await act(async () => {
      render(<SavedPagesList />)
    })
    expect(screen.getByText("Saved pages")).toBeInTheDocument()
  })

  it("renders a message when there are no saved pages", async () => {
    ;(pagesService.getAll as jest.Mock).mockResolvedValue([])
    await act(async () => {
      render(<SavedPagesList />)
    })
    expect(await screen.findByText("No saved pages")).toBeInTheDocument()
  })

  it("renders the list of saved page groups", async () => {
    await act(async () => {
      render(<SavedPagesList />)
    })
    expect(await screen.findByText("Group 1")).toBeInTheDocument()
  })

  it("renders the correct icon for each group", async () => {
    await act(async () => {
      render(<SavedPagesList />)
    })
    const icon = await screen.findByAltText("Group 1")
    expect(icon).toHaveAttribute("src", "https://example.com/favicon.ico")
  })
})
