import type { JSX, PropsWithChildren } from "react"

export interface IAccordionItemProps extends PropsWithChildren {
  id?: string
  title: string | ((props: { isExpanded: boolean; onClick: () => void }) => JSX.Element)
  onToggle?: (id: string) => void
}
