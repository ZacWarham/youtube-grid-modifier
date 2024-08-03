// Function to set CSS variables on ytd-rich-grid-renderer
function setGridItemsPerRow(gridItemsValue, slimItemsValue) {
  const gridRenderer = document.querySelector('ytd-rich-grid-renderer');
  if (gridRenderer) {
    gridRenderer.style.setProperty('--ytd-rich-grid-items-per-row', gridItemsValue);
    gridRenderer.style.setProperty('--ytd-rich-grid-slim-items-per-row', slimItemsValue);
  }
}

// Retrieve and apply the stored values on DOM content loaded
function applyStoredGridItemsPerRow() {
  chrome.storage.sync.get(['gridItemsPerRow', 'slimItemsPerRow'], (data) => {
    setGridItemsPerRow(data.gridItemsPerRow || 6, data.slimItemsPerRow || 5); // Default to 6 if not set
  });
}

document.addEventListener('DOMContentLoaded', applyStoredGridItemsPerRow);
document.addEventListener('yt-navigate-finish', applyStoredGridItemsPerRow);

// Listen for changes from the popup and apply them
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    chrome.storage.sync.get(['gridItemsPerRow', 'slimItemsPerRow'], (data) => {
      setGridItemsPerRow(data.gridItemsPerRow || 6, data.slimItemsPerRow || 5);
    });
  }
});
