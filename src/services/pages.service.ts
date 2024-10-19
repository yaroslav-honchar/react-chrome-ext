import type { IChromeStore } from "../types/chrome-store.type"
import type { IPage } from "../types/page.type"

/**
 * Service for managing pages in the Chrome local storage.
 */
class PagesService {
  /**
   * Adds a new page to the Chrome local storage.
   *
   * @param {string | undefined} title - The title of the page.
   * @param {string | undefined} url - The URL of the page.
   * @returns {Promise<void>} A promise that resolves when the page is saved.
   * @throws {Error} If the title or URL is not provided.
   */
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

  /**
   * Retrieves all pages from the Chrome local storage.
   *
   * @returns {Promise<IPage[]>} A promise that resolves to an array of pages.
   */
  async getAll(): Promise<IPage[]> {
    const store = await chrome.storage.local.get<IChromeStore>()
    return store?.pages || []
  }
}

/**
 * Instance of PagesService for managing pages.
 */
export const pagesService = new PagesService()
