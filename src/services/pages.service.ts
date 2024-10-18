import type { IChromeStore } from "../types/chrome-store.type"
import type { IPage } from "../types/page.type"

class PagesService {
  async add(title: string | undefined, url: string | undefined): Promise<void> {
    if (!title || !url) {
      throw new Error(`[STORE_ADD_ITEM] Failed to save page "${title}" at URL: ${url}`)
    }

    const pageIcon = `https://www.google.com/s2/favicons?domain=${url}`

    const store = await chrome.storage.local.get<IChromeStore>()
    const pages = store.pages || []

    const newPages = pages.filter((page: IPage) => page.href !== url)

    newPages.push({
      title,
      href: url,
      icon: pageIcon,
    })

    return chrome.storage.local
      .set<IChromeStore>({ pages: newPages })
      .then(() => {
        console.log(`Page "${title}" saved at URL: ${url}`)
        return Promise.resolve()
      })
      .catch((error) => {
        console.error(`Failed to save page "${title}" at URL: ${url}`, error)
        return Promise.reject(error)
      })
  }

  async getAll() {
    const store = await chrome.storage.local.get<IChromeStore>()
    return store.pages || []
  }
}

export const pagesService = new PagesService()
