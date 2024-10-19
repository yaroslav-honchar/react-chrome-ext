import React, { useEffect, useState } from "react"
import { pagesService } from "../../services/pages.service"
import type { IPage } from "../../types/page.type"
import { Button } from "../ui/Button"
import { Image } from "../ui/Image"
import { Text } from "../ui/Text"
import type { SavedPagesListProps } from "./SavedPagesList.props"

export const SavedPagesList: React.FC<SavedPagesListProps> = () => {
  const [pages, setPages] = useState<IPage[]>([])

  useEffect(() => {
    pagesService.getAll().then((savedPages) => {
      savedPages.length !== 0 && setPages(savedPages)
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

      <ul className={"flex gap-2 flex-col max-h-full pe-2 overflow-y-auto overflow-x-hidden"}>
        {pages.map(({ href, icon, title }) => (
          <li key={href}>
            <Button
              href={href}
              className={
                "flex gap-2 items-center py-2 px-4 rounded-xl transition bg-gray-800 hover:bg-gray-600 text-white"
              }
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
                className={"text-xs"}
              >
                {title}
              </Text>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
