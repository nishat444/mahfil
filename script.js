// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.track-item, .video-item, .track-row, .contact-item').forEach(el => {
    observer.observe(el);
});

// Music Player Functionality
class MusicPlayer {
    constructor() {
        this.currentTrack = 0;
        this.isPlaying = false;
        this.audio = new Audio();
        this.tracks = [
            {
                title: "Track Title 1",
                artist: "Artist Name",
                src: "assets/music/track1.mp3",
                cover: "assets/track1.jpg"
            },
            {
                title: "Track Title 2", 
                artist: "Artist Name",
                src: "assets/music/track2.mp3",
                cover: "assets/track2.jpg"
            },
            {
                title: "Track Title 3",
                artist: "Artist Name", 
                src: "assets/music/track3.mp3",
                cover: "assets/track3.jpg"
            }
        ];
        this.init();
    }

    init() {
        this.createPlayer();
        this.bindEvents();
    }

    createPlayer() {
        // Create floating music player
        const playerHTML = `
            <div class="music-player" id="musicPlayer">
                <div class="player-content">
                    <div class="track-info">
                        <img src="${this.tracks[0].cover}" alt="Track Cover" class="track-cover">
                        <div class="track-details">
                            <h4 class="track-title">${this.tracks[0].title}</h4>
                            <p class="track-artist">${this.tracks[0].artist}</p>
                        </div>
                    </div>
                    <div class="player-controls">
                        <button class="control-btn" id="prevBtn">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button class="control-btn play-btn" id="playBtn">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="control-btn" id="nextBtn">
                            <i class="fas fa-step-forward"></i>
                        </button>
                    </div>
                    <div class="player-progress">
                        <span class="current-time">0:00</span>
                        <div class="progress-bar">
                            <div class="progress" id="progress"></div>
                        </div>
                        <span class="total-time">0:00</span>
                    </div>
                    <button class="close-player" id="closePlayer">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', playerHTML);
    }

    bindEvents() {
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const closePlayer = document.getElementById('closePlayer');
        const progress = document.getElementById('progress');

        playBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.previousTrack());
        nextBtn.addEventListener('click', () => this.nextTrack());
        closePlayer.addEventListener('click', () => this.closePlayer());

        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
        } else {
            this.audio.src = this.tracks[this.currentTrack].src;
            this.audio.play();
            this.isPlaying = true;
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack();
    }

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.loadTrack();
    }

    loadTrack() {
        const track = this.tracks[this.currentTrack];
        this.audio.src = track.src;
        document.querySelector('.track-title').textContent = track.title;
        document.querySelector('.track-artist').textContent = track.artist;
        document.querySelector('.track-cover').src = track.cover;
        
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    updateProgress() {
        const progress = document.getElementById('progress');
        const currentTime = document.querySelector('.current-time');
        const totalTime = document.querySelector('.total-time');
        
        const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
        progress.style.width = progressPercent + '%';
        
        currentTime.textContent = this.formatTime(this.audio.currentTime);
        totalTime.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    closePlayer() {
        document.getElementById('musicPlayer').style.display = 'none';
        this.audio.pause();
        this.isPlaying = false;
    }

    showPlayer() {
        document.getElementById('musicPlayer').style.display = 'block';
    }
}

// Initialize music player
const musicPlayer = new MusicPlayer();

// Add click events to play buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.play-overlay') || e.target.closest('.play-btn')) {
        musicPlayer.showPlayer();
        musicPlayer.togglePlay();
    }
});

// Contact Form Validation and Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Newsletter Form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        newsletterForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Video modal functionality
function createVideoModal() {
    const modalHTML = `
        <div class="video-modal" id="videoModal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="video-container">
                    <iframe id="videoFrame" src="" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('videoModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.getElementById('videoFrame').src = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.getElementById('videoFrame').src = '';
        }
    });
}

// Initialize video modal
createVideoModal();

// Add video click events
document.addEventListener('click', (e) => {
    if (e.target.closest('.play-button')) {
        const videoItem = e.target.closest('.video-item');
        const videoTitle = videoItem.querySelector('h4').textContent;
        
        // In a real implementation, you would have actual video URLs
        const videoUrl = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`;
        
        document.getElementById('videoFrame').src = videoUrl;
        document.getElementById('videoModal').style.display = 'block';
    }
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Ensure YouTube links work properly
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for YouTube links as fallback
    const youtubeLinks = document.querySelectorAll('a[href*="youtube.com/@ajmusic555"]');
    
    youtubeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ensure the link opens in a new tab
            const url = 'https://www.youtube.com/@ajmusic555';
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for music player
const playerCSS = `
    .music-player {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        padding: 20px;
        max-width: 400px;
        z-index: 1000;
        display: none;
    }
    
    .player-content {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .track-info {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .track-cover {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        object-fit: cover;
    }
    
    .track-details h4 {
        margin: 0;
        font-size: 1rem;
        color: #2c3e50;
    }
    
    .track-details p {
        margin: 0;
        font-size: 0.9rem;
        color: #666;
    }
    
    .player-controls {
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    
    .control-btn {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: #ff6b6b;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .control-btn:hover {
        background: #e55a5a;
        transform: scale(1.1);
    }
    
    .play-btn {
        width: 50px;
        height: 50px;
    }
    
    .player-progress {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .progress-bar {
        flex: 1;
        height: 4px;
        background: #e9ecef;
        border-radius: 2px;
        overflow: hidden;
    }
    
    .progress {
        height: 100%;
        background: #ff6b6b;
        width: 0%;
        transition: width 0.1s ease;
    }
    
    .current-time, .total-time {
        font-size: 0.8rem;
        color: #666;
        min-width: 35px;
    }
    
    .close-player {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.2rem;
        color: #666;
        cursor: pointer;
    }
    
    .video-modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
    }
    
    .modal-content {
        position: relative;
        margin: 5% auto;
        width: 90%;
        max-width: 800px;
        background: white;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        color: white;
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
    }
    
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }
    
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    @media (max-width: 768px) {
        .music-player {
            bottom: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .modal-content {
            margin: 10% auto;
            width: 95%;
        }
    }
`;

// Inject player CSS
const style = document.createElement('style');
style.textContent = playerCSS;
document.head.appendChild(style);
