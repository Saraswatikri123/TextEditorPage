let isDragging = false;
let offsetX, offsetY;

function execCommand(command, value = null) {
  document.execCommand(command, false, value);
}

function undo() {
  document.execCommand('undo');
}

function redo() {
  document.execCommand('redo');
}

function increaseFontSize() {
  const textContent = document.getElementById('text-content');
  let currentSize = parseInt(window.getComputedStyle(textContent).fontSize);
  textContent.style.fontSize = (currentSize + 2) + "px";
  document.getElementById('fontSizeInput').value = currentSize + 2;
}

function decreaseFontSize() {
  const textContent = document.getElementById('text-content');
  let currentSize = parseInt(window.getComputedStyle(textContent).fontSize);
  if (currentSize > 8) {
    textContent.style.fontSize = (currentSize - 2) + "px";
    document.getElementById('fontSizeInput').value = currentSize - 2;
  }
}

function setFontSize(size) {
  const textContent = document.getElementById('text-content');
  textContent.style.fontSize = size + "px";
}

function changeFontStyle(font) {
  document.execCommand('fontName', false, font);
}

// Align text
function alignText(alignment) {
  const textContent = document.getElementById('text-content');
  textContent.style.textAlign = alignment;  // Apply text alignment directly to #text-content
}

// Make the text content draggable
function startDrag(event) {
  isDragging = true;
  offsetX = event.clientX - parseInt(window.getComputedStyle(event.target).left);
  offsetY = event.clientY - parseInt(window.getComputedStyle(event.target).top);
  document.addEventListener('mousemove', dragText);
  document.addEventListener('mouseup', stopDrag);
}

function dragText(event) {
  if (isDragging) {
    const textContent = document.getElementById('text-content');
    textContent.style.left = (event.clientX - offsetX) + "px";
    textContent.style.top = (event.clientY - offsetY) + "px";
  }
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', dragText);
  document.removeEventListener('mouseup', stopDrag);
}

// Attach drag event to the text content
document.getElementById('text-content').addEventListener('mousedown', startDrag);
