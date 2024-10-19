import React, { type SyntheticEvent, useEffect, useState } from "react"
import { pagesService } from "../../services/pages.service"
import type { IPage } from "../../types/page.type"
import { Button } from "../ui/Button/Button.ui"
import { Text } from "../ui/Text"
import type { SavedPagesListProps } from "./SavedPagesList.props"

export const SavedPagesList: React.FC<SavedPagesListProps> = () => {
  const [pages, setPages] = useState<IPage[]>([])

  useEffect(() => {
    pagesService.getAll().then((savedPages) => {
      savedPages.length !== 0 && setPages(savedPages)
    })
  }, [])

  const onImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/img/icon-48.png"
  }

  return (
    <>
      <Text className={"mb-8"}>Pages</Text>

      <ul className={"flex gap-2 flex-col"}>
        {pages.map(({ href, icon, title }) => (
          <li key={href}>
            <Button
              href={href}
              className={
                "flex gap-2 items-center py-2 px-6 rounded-2xl transition bg-gray-800 hover:bg-gray-600 text-white"
              }
            >
              <img
                src={icon}
                alt={title}
                className={"w-4 h-4 object-contain"}
                onError={onImageError}
              />
              <Text
                lineClamp={1}
                variant={"p"}
                tag={"span"}
              >
                {title}
              </Text>
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}
