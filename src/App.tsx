import type { SyntheticEvent } from "react"
import { useEffect, useState } from "react"
import { pagesService } from "./services/pages.service"
import type { IPage } from "./types/page.type"

export const App = () => {
  const [pages, setPages] = useState<IPage[]>([])

  const onImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/images/icon512.png"
  }

  useEffect(() => {
    pagesService.getAll().then((savedPages) => {
      savedPages.length !== 0 && setPages(savedPages)
    })
  }, [])

  return (
    <div className="w-[15rem] h-[15rem] bg-green-500">
      Pages
      <ul>
        {pages.map((page) => (
          <li
            key={page.href}
            className={"flex gap-2"}
          >
            <img
              src={page.icon}
              alt={page.title}
              className={"w-8 h-8 object-contain"}
              onError={onImageError}
            />
            <p>{page.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
