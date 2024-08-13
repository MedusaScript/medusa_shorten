document.getElementById('shortenForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const url = document.getElementById('urlInput').value;
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const shortUrlLink = document.getElementById('shortUrl');

    // Tampilkan loading animation
    loadingDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    // Simulasi proses mempersingkat URL
    setTimeout(() => {
        // Simulasi hasil URL pendek
        const shortUrl = `https://medusashorten/${Math.random().toString(36).substr(2, 8)}`;
        
        // Sembunyikan loading animation
        loadingDiv.classList.add('hidden');

        // Tampilkan hasil URL pendek
        shortUrlLink.href = shortUrl;
        shortUrlLink.textContent = shortUrl;
        resultDiv.classList.remove('hidden');
    }, 2000); // 2 detik delay
});

document.getElementById('copyButton').addEventListener('click', function() {
    const shortUrlLink = document.getElementById('shortUrl');
    navigator.clipboard.writeText(shortUrlLink.href).then(() => {
        alert('URL berhasil disalin ke clipboard!');
    });
});
