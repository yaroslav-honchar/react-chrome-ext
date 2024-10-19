import { fireEvent, render, screen } from "@testing-library/react"
import AccordionContext from "./Accordion.context"
import { Accordion } from "./Accordion.ui"

describe("Accordion", () => {
  it("renders children correctly", () => {
    render(
      <Accordion>
        <li>Item 1</li>
        <li>Item 2</li>
      </Accordion>,
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
  })

  it("toggles item expansion state", () => {
    render(
      <Accordion>
        <AccordionContext.Consumer>
          {({ toggleItem, expandedItems }) => (
            <>
              <button onClick={() => toggleItem("item1")}>Toggle Item 1</button>
              <div>{expandedItems.includes("item1") ? "Expanded" : "Collapsed"}</div>
            </>
          )}
        </AccordionContext.Consumer>
      </Accordion>,
    )
    const button = screen.getByText("Toggle Item 1")
    fireEvent.click(button)
    expect(screen.getByText("Expanded")).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.getByText("Collapsed")).toBeInTheDocument()
  })

  it("handles multiple items expansion state", () => {
    render(
      <Accordion>
        <AccordionContext.Consumer>
          {({ toggleItem, expandedItems }) => (
            <>
              <button onClick={() => toggleItem("item1")}>Toggle Item 1</button>
              <button onClick={() => toggleItem("item2")}>Toggle Item 2</button>
              <div>{expandedItems.includes("item1") ? "Item 1 Expanded" : "Item 1 Collapsed"}</div>
              <div>{expandedItems.includes("item2") ? "Item 2 Expanded" : "Item 2 Collapsed"}</div>
            </>
          )}
        </AccordionContext.Consumer>
      </Accordion>,
    )
    const button1 = screen.getByText("Toggle Item 1")
    const button2 = screen.getByText("Toggle Item 2")
    fireEvent.click(button1)
    expect(screen.getByText("Item 1 Expanded")).toBeInTheDocument()
    expect(screen.getByText("Item 2 Collapsed")).toBeInTheDocument()
    fireEvent.click(button2)
    expect(screen.getByText("Item 1 Expanded")).toBeInTheDocument()
    expect(screen.getByText("Item 2 Expanded")).toBeInTheDocument()
  })
})
