chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "savePage",
    title: "Зберегти цю сторінку",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "savePage") {
    const pageURL = tab.url;

    chrome.storage.local.set(
      {
        pages: JSON.stringify({[tab.title]: pageURL})
      },
      () => {
        console.log(`Сторінка "${tab.title}" збережена за адресою: ${pageURL}`);
      });

    chrome.storage.local.get('pages', (result) => {
      console.log(result);
    });
  }
});
