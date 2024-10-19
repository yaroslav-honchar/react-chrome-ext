import cn from "classnames"
import { ChevronDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { pagesService } from "../../services/pages.service"
import type { IPageGroup } from "../../types/page.type"
import { Accordion, AccordionItem } from "../ui/Accordion"
import { Button } from "../ui/Button"
import { Image } from "../ui/Image"
import { Text } from "../ui/Text"
import type { SavedPagesListProps } from "./SavedPagesList.props"

export const SavedPagesList: React.FC<SavedPagesListProps> = () => {
  const [groups, setGroups] = useState<IPageGroup[]>([])

  useEffect(() => {
    pagesService.getAll().then((savedGroups) => {
      savedGroups.length !== 0 && setGroups(savedGroups)
    })
  }, [])

  return (
    <div className={"max-h-full h-full flex flex-col"}>
      <Text
        variant={"h3"}
        className={"mb-4"}
      >
        Saved pages
      </Text>

      {groups.length === 0 ? (
        <Text className={"m-auto"}>No saved pages</Text>
      ) : (
        <div className={"flex gap-2 flex-col max-h-full pe-2 overflow-y-auto overflow-x-hidden"}>
          <Accordion className={"flex flex-col gap-4"}>
            {groups.map(({ title, pages, icon, originUrl }) => (
              <AccordionItem
                title={({ isExpanded, onClick }) => (
                  <Button
                    variant={"transparent"}
                    className={cn(
                      "flex gap-2 w-full mb-2 items-center py-2 px-4 rounded-xl transition bg-gray-800 hover:bg-gray-600 text-white",
                      {
                        "bg-gray-600": isExpanded,
                      },
                    )}
                    onClick={onClick}
                  >
                    <Image
                      src={icon}
                      alt={title}
                      className={"w-4 h-4 object-contain"}
                    />
                    <Text
                      lineClamp={1}
                      variant={"p"}
                      tag={"span"}
                      className={"text-xs w-fit"}
                    >
                      {title}
                    </Text>
                    <ChevronDown
                      className={cn("w-4 h-4 transition ms-auto", {
                        "transform rotate-180": isExpanded,
                      })}
                    />
                  </Button>
                )}
                key={originUrl}
              >
                <ul className={"flex flex-col gap-2"}>
                  {pages.map(({ href, title }) => (
                    <li key={href}>
                      <Button
                        href={href}
                        className={
                          "flex gap-2 w-full items-center py-2 px-4 rounded-xl transition bg-gray-800 hover:bg-gray-600 text-white"
                        }
                        title={title}
                      >
                        <Text
                          lineClamp={1}
                          variant={"p"}
                          tag={"span"}
                          className={"text-xs"}
                        >
                          {title}
                        </Text>
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
