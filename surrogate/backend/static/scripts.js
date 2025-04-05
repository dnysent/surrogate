const BASE_URL = "";

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
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('tile');
        img.setAttribute('data-filename', file.name); // Wichtig!
        img.style.border = '3px solid grey';
        container.appendChild(img);
    });
}

function sortAndHighlightImages(closestImages) {
    const grid = document.getElementById('image-grid');
    const images = Array.from(grid.children);

    // Mapping filename → img Element
    const imgMap = {};
    images.forEach(img => {
        const filename = img.getAttribute('data-filename');
        imgMap[filename] = img;
        img.style.border = '3px solid grey'; // Zurücksetzen
    });

    // Container leeren
    grid.innerHTML = '';

    // zuerst closestImages anhängen, sortiert
    closestImages.forEach(imgData => {
        const imgElement = imgMap[imgData.id];
        if (imgElement) {
            imgElement.style.border = '4px solid green';
            grid.appendChild(imgElement);
        }
    });

    // dann restliche Bilder anhängen
    Object.keys(imgMap).forEach(filename => {
        if (!closestImages.some(imgData => imgData.id === filename)) {
            grid.appendChild(imgMap[filename]);
        }
    });
}

function displayLargeImage(file) {
    const container = document.getElementById('large-image-container');
    const url = URL.createObjectURL(file);
    container.innerHTML = `<img src="${url}" class="large-tile">`;
}
