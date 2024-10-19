import cn from "classnames"
import { ChevronDown } from "lucide-react"
import React, { useId, useRef } from "react"
import { useAccordionContext } from "../../Accordion.context"
import type { IAccordionItemProps } from "./AccordionItem.props"

export const AccordionItem: React.FC<IAccordionItemProps> = ({ id, children, onToggle, title }) => {
  const { expandedItems, toggleItem } = useAccordionContext()
  const itemID = useRef(id ?? useId()).current

  const isExpanded = expandedItems.includes(itemID)

  const onToggleHandler = () => {
    toggleItem(itemID)
    onToggle?.(itemID)
  }

  return (
    <li>
      {typeof title === "string" ? (
        <button
          className={"flex gap-2 items-center w-full"}
          onClick={onToggleHandler}
        >
          <ChevronDown
            className={cn("w-4 h-4 transition ms-auto", {
              "transform rotate-180": isExpanded,
            })}
          />
          <span>{title}</span>
        </button>
      ) : (
        <>{title({ isExpanded, onClick: onToggleHandler })}</>
      )}
      {isExpanded && <div>{children}</div>}
    </li>
  )
}
