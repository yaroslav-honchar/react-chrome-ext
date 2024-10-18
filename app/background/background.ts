import { pagesService } from "../services/pages.service"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "savePage",
    title: "Зберегти цю сторінку",
    contexts: ["all"],
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case "savePage":
      await pagesService.add(tab?.title, tab?.url)
      break
  }
})

export {}
