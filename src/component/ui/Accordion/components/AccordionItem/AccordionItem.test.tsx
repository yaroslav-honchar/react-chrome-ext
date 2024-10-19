import type { AccordionContextType } from "../../Accordion.context"
import { useAccordionContext } from "../../Accordion.context"
import { fireEvent, render, screen } from "@testing-library/react"
import { AccordionItem } from "./AccordionItem.ui"

jest.mock("../../Accordion.context")

describe("AccordionItem", () => {
  const mockToggleItem = jest.fn()
  const mockOnToggle = jest.fn()
  const mockContext: AccordionContextType = {
    expandedItems: [],
    toggleItem: mockToggleItem,
  }

  beforeEach(() => {
    ;(useAccordionContext as jest.Mock).mockReturnValue(mockContext)
  })

  it("renders the button with collapsed state initially", () => {
    render(
      <AccordionItem
        id="item1"
        title="Item 1"
        onToggle={mockOnToggle}
      >
        Content
      </AccordionItem>,
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
  })

  it("toggles expansion state on button click", () => {
    render(
      <AccordionItem
        id="item1"
        title="Item 1"
        onToggle={mockOnToggle}
      >
        Content
      </AccordionItem>,
    )
    const button = screen.getByText("Item 1")
    fireEvent.click(button)
    expect(mockToggleItem).toHaveBeenCalledWith("item1")
    expect(mockOnToggle).toHaveBeenCalledWith("item1")
  })

  it("renders children when expanded", () => {
    mockContext.expandedItems = ["item1"]
    render(
      <AccordionItem
        id="item1"
        title="Item 1"
        onToggle={mockOnToggle}
      >
        Content
      </AccordionItem>,
    )
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("does not render children when collapsed", () => {
    render(
      <AccordionItem
        id="item2"
        title="Item 1"
        onToggle={mockOnToggle}
      >
        Content
      </AccordionItem>,
    )
    expect(screen.queryByText("Content")).not.toBeInTheDocument()
  })

  it("renders custom title component correctly", () => {
    render(
      <AccordionItem
        id="item2"
        title={({ isExpanded, onClick }) => (
          <button onClick={onClick}>{isExpanded ? "Collapse" : "Expand"}</button>
        )}
        onToggle={mockOnToggle}
      >
        Content
      </AccordionItem>,
    )
    expect(screen.getByText("Expand")).toBeInTheDocument()
  })

  it("calls onToggle with correct id when custom title component is clicked", () => {
    render(
      <AccordionItem
        id="item2"
        title={({ isExpanded, onClick }) => (
          <button onClick={onClick}>{isExpanded ? "Collapse" : "Expand"}</button>
        )}
        onToggle={mockOnToggle}
      >
        Content
      </AccordionItem>,
    )
    const button = screen.getByText("Expand")
    fireEvent.click(button)
    expect(mockToggleItem).toHaveBeenCalledWith("item2")
    expect(mockOnToggle).toHaveBeenCalledWith("item2")
  })
})
