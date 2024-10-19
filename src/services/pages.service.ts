import type { IChromeStore } from "../types/chrome-store.type"
import type { IPageGroup } from "../types/page.type"

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
  async addPage(title: string | undefined, url: string | undefined): Promise<void> {
    if (!title || !url) {
      throw new Error(`[STORE_ADD_ITEM] Failed to save page "${title}" at URL: ${url}`)
    }

    const { origin: originUrl, host: originHost } = new URL(url)

    const store = await chrome.storage.local.get<IChromeStore>()
    const pages = store.pages || []
    const group = pages.find((group) => group.originUrl === originUrl)

    if (!group) {
      pages.push({
        title: originHost,
        originUrl,
        icon: `https://www.google.com/s2/favicons?domain=${originUrl}`,
        pages: [{ title, href: url }],
      })
    } else {
      const existingPage = group.pages.find((page) => page.href === url)
      if (!existingPage) {
        group.pages.push({ title, href: url })
      }
    }

    pages.forEach((group) => {
      group.pages.sort((a, b) => a.title.localeCompare(b.title))
    })
    pages.sort((a, b) => a.title.localeCompare(b.title))

    return chrome.storage.local.set<IChromeStore>({ pages })
  }

  /**
   * Retrieves all pages from the Chrome local storage.
   *
   * @returns {Promise<IPage[]>} A promise that resolves to an array of pages.
   */
  async getAll(): Promise<IPageGroup[]> {
    const store = await chrome.storage.local.get<IChromeStore>()
    return store?.pages || []
  }
}

/**
 * Instance of PagesService for managing pages.
 */
export const pagesService = new PagesService()
