const BASE_URL = "";
let topK = 5;
let selectedModel = "laion_openclip";
let similarityThreshold = 0.5;

document.getElementById('multipleImages').addEventListener('change', async function(event) {
    const files = event.target.files;
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("files", file));

    const response = await fetch(`${BASE_URL}/api/upload_images`, {
        method: 'POST',
        body: formData
    });
    await response.json();

    displayImages(files);
});

document.getElementById('singleImage').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("top_k", topK.toString());

    const response = await fetch(`${BASE_URL}/api/query_image`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();

    sortAndHighlightImages(data.closest_images);
    displayLargeImage(file);
});

function displayImages(files) {
    const container = document.getElementById('image-grid');
    container.innerHTML = '';
    Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        const imgContainer = createImageTile(url, file.name);
        container.appendChild(imgContainer);
    });
}

function createImageTile(url, filename) {
    const container = document.createElement('div');
    container.classList.add('tile-container');

    const img = document.createElement('img');
    img.src = url;
    img.classList.add('tile');
    img.setAttribute('data-filename', filename);

    const label = document.createElement('div');
    label.classList.add('similarity-label');
    label.innerText = '';  // leer initial

    container.appendChild(img);
    container.appendChild(label);

    return container;
}

function sortAndHighlightImages(closestImages) {
    const grid = document.getElementById('image-grid');
    const tiles = Array.from(grid.children);

    // Mapping filename → tile Container
    const tileMap = {};
    tiles.forEach(tile => {
        const filename = tile.querySelector('img').getAttribute('data-filename');
        tileMap[filename] = tile;
        setTileBorder(tile, 'red');  // initial rot für alle
        setSimilarityLabel(tile, ''); // reset similarity
    });

    // Container leeren und neu befüllen
    grid.innerHTML = '';

    // zuerst closestImages anhängen (grün), sortiert
    closestImages.forEach(imgData => {
        const tileElement = tileMap[imgData.id];
        if (tileElement) {
            if (imgData.similarity >= similarityThreshold) {
                setTileBorder(tileElement, 'green');
            } else {
                setTileBorder(tileElement, 'yellow');
            }
            setSimilarityLabel(tileElement, imgData.similarity.toFixed(4));
            grid.appendChild(tileElement);
        }
    });

    // dann restliche Bilder anhängen (rot)
    Object.keys(tileMap).forEach(filename => {
        if (!closestImages.some(imgData => imgData.id === filename)) {
            grid.appendChild(tileMap[filename]);
        }
    });
}

function setTileBorder(tile, color) {
    const img = tile.querySelector('img');
    img.style.border = `8px solid ${color}`;
}

function setSimilarityLabel(tile, text) {
    const label = tile.querySelector('.similarity-label');
    label.innerText = text ? `Similarity: ${text}` : '';
}

function displayLargeImage(file) {
    const container = document.getElementById('large-image-container');
    const url = URL.createObjectURL(file);
    container.innerHTML = `<img src="${url}" class="large-tile">`;
}

document.getElementById('settingsBtn').onclick = () => {
  const modal = document.getElementById('settingsModal');
  modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('saveSettings').onclick = () => {
    const k = parseInt(document.getElementById('topK').value, 10);
    const threshold = parseFloat(document.getElementById('threshold').value);
  
    if (!isNaN(k) && k > 0 && !isNaN(threshold)) {
      topK = k;
      similarityThreshold = threshold;
  
      // alert(`Settings updated:\nTop-K: ${topK}\nThreshold: ${similarityThreshold}`);
      document.getElementById('settingsModal').style.display = 'none';
    } else {
      alert('Please enter valid values!');
    }
  };