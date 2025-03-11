// Image upload handling
const handleFileSelect = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => generatePreview(img);
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Text-based favicon generation
const generateTextIcon = () => {
  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');
  // ... draw text on canvas with selected colors
};

// Multi-size favicon generation
const generateFavicons = async () => {
  const zip = new JSZip();
  const sizes = [16, 32, 48, 64, 128, 192];
  
  sizes.forEach(size => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    // ... draw icon at different sizes
    zip.file(`favicon-${size}x${size}.png`, await canvasToBlob(canvas));
  });
  
  // Generate ICO file
  zip.generateAsync({type: "blob"}).then(content => {
    saveAs(content, "favicon-package.zip");
  });
};

// Drag-and-drop functionality
const dropArea = document.getElementById('dropArea');
dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.style.borderColor = '#007bff';
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.style.borderColor = '#ccc';
  const file = e.dataTransfer.files[0];
  handleFileSelect(file);
});
