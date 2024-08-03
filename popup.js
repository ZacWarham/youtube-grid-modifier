document.addEventListener('DOMContentLoaded', () => {
  const gridItemsInput = document.getElementById('grid-items-input');
  const slimItemsInput = document.getElementById('slim-items-input');
  const saveButton = document.getElementById('save-button');

  // Load the saved values and set them in the input fields
  chrome.storage.sync.get(['gridItemsPerRow', 'slimItemsPerRow'], (data) => {
    if (data.gridItemsPerRow) {
      gridItemsInput.value = data.gridItemsPerRow;
    }
    if (data.slimItemsPerRow) {
      slimItemsInput.value = data.slimItemsPerRow;
    }
  });

  // Save the new values when the save button is clicked
  saveButton.addEventListener('click', () => {
    const gridItemsValue = parseInt(gridItemsInput.value, 10);
    const slimItemsValue = parseInt(slimItemsInput.value, 10);

    if (!isNaN(gridItemsValue) && gridItemsValue > 0 && !isNaN(slimItemsValue) && slimItemsValue > 0) {
      chrome.storage.sync.set({
        gridItemsPerRow: gridItemsValue,
        slimItemsPerRow: slimItemsValue
      });
    }
  });
});
