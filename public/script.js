document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const url = document.getElementById('url').value;

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    .then(response => response.json())
    .then(data => {
        const qrImage = document.getElementById('qr-image');
        const downloadLink = document.getElementById('download-link');
        qrImage.src = data.src;
        downloadLink.href = data.src;

        document.getElementById('qr-result').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
