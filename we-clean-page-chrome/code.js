const id = getTabId();

chrome.scripting.executeScript ({
    target: {tabId: id, allFrames: true},
    files: ['text.js', 'cleanPage.js'],
});
chrome.scripting.insertCSS ({
    target: {tabId: id, allFrames: true},
    files: ['structure.css', 'perso.css'],
});