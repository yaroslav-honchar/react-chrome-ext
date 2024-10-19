import { createContext, useContext } from "react"

export interface AccordionContextType {
  expandedItems: string[]
  toggleItem: (id: string) => void
}

const defaultContext: AccordionContextType = {
  expandedItems: [],
  toggleItem: () => {},
}

const AccordionContext = createContext<AccordionContextType>(defaultContext)

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error(
      "Accordion compound components cannot be rendered outside the Accordion component",
    )
  }
  return context
}

export default AccordionContext
