const BASE_URL = ""; // Da Frontend & Backend nun dieselbe IP haben

document.getElementById('multipleImages').addEventListener('change', async function(event) {
    const files = event.target.files;
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("files", file));

    const response = await fetch(`${BASE_URL}/api/upload_images`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
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
    highlightTopImages(data.closest_images);
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
        container.appendChild(img);
    });
}

function highlightTopImages(imageIds) {
    // Hervorheben der Kacheln basierend auf imageIds (grüne Rahmen etc.)
}

function displayLargeImage(file) {
    const container = document.getElementById('large-image-container');
    const url = URL.createObjectURL(file);
    container.innerHTML = `<img src="${url}" class="large-tile">`;
}
