onload = () => {
    const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
    }, 1000);

    // Music control functionality
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicBtn.querySelector('.music-icon');
    const musicText = musicBtn.querySelector('.music-text');
    let isPlaying = false;

    // Set initial volume
    bgMusic.volume = 0.5;

    // Function to toggle music
    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🎵';
            musicText.textContent = 'Bật nhạc';
        } else {
            bgMusic.play()
                .then(() => {
                    musicIcon.textContent = '🔊';
                    musicText.textContent = 'Tắt nhạc';
                })
                .catch(error => {
                    console.error('Lỗi khi phát nhạc:', error);
                    alert('Trình duyệt không cho phép phát nhạc tự động. Vui lòng nhấn nút "Bật nhạc"');
                });
        }
        isPlaying = !isPlaying;
    }

    // Add click event to music button
    musicBtn.addEventListener('click', toggleMusic);

    // Try to auto-play (may be blocked by browser)
    document.addEventListener('click', function initAudio() {
        bgMusic.play()
            .then(() => {
                musicIcon.textContent = '🔊';
                musicText.textContent = 'Tắt nhạc';
                isPlaying = true;
            })
            .catch(e => {
                console.log('Cần tương tác để phát nhạc');
            });
        // Remove this listener after first interaction
        document.removeEventListener('click', initAudio);
    }, { once: true });
};