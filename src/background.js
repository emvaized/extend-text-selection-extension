const selectMoreText = {
    "id": "extendTextSelection",
    "title": chrome.i18n.getMessage('extendTextSelection'),
    "contexts": ["selection"]
}  
chrome.contextMenus.create(selectMoreText);

chrome.contextMenus.onClicked.addListener(function(d, tab) {
    if (tab) extendTextSelection(tab)
})
chrome.commands.onCommand.addListener((command, tab) => {
    if (command === "extend-text-selection") {
        extendTextSelection(tab)
    }
})

function extendTextSelection(tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const selection = window.getSelection(), range = document.createRange();
            const parentNode = selection.anchorNode !== selection.focusNode ? selection.anchorNode.parentNode.parentNode : selection.anchorNode.parentNode;
            range.selectNodeContents(parentNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    })
}