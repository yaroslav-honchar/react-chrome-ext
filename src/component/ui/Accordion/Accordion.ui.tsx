import React, { useState } from "react"
import type { AccordionContextType } from "./Accordion.context"
import AccordionContext from "./Accordion.context"
import type { IAccordionProps } from "./Accordion.props"

export const Accordion: React.FC<IAccordionProps> = ({ children, className }) => {
  const [expandedItems, setExpandedItems] = useState<AccordionContextType["expandedItems"]>([])

  const toggleItem = (id: string) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(id)) {
        return prevExpandedItems.filter((item) => item !== id)
      } else {
        return [...prevExpandedItems, id]
      }
    })
  }

  return (
    <AccordionContext.Provider
      value={{
        expandedItems,
        toggleItem,
      }}
    >
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  )
}
