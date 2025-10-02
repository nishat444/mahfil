# Mahfil Website

A modern, responsive website inspired by Jazim Sharma's official website, featuring a music artist's portfolio with tracks, videos, and contact information.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Music Player**: Built-in music player with play/pause, next/previous controls
- **Video Gallery**: Interactive video section with modal playback
- **Contact Form**: Functional contact form with validation
- **Newsletter Signup**: Email subscription functionality
- **Dropdown Navigation**: Organized navigation with external links
- **Smooth Scrolling**: Enhanced user experience with smooth page transitions

## Getting Started

1. **Download Placeholder Images**:
   - Open `generate_placeholders.html` in your browser
   - Download all the placeholder images to the `assets/` folder
   - This will provide all the necessary images for the website

2. **Add Your Content**:
   - Replace placeholder text with your actual content
   - Update the artist name, bio, and other personal information
   - Add your actual music tracks and video URLs

3. **Customize**:
   - Modify colors in `styles.css` to match your brand
   - Update the logo and images in the `assets/` folder
   - Add your actual music files to `assets/music/`

## File Structure

```
Mahfil_website/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # JavaScript functionality
├── generate_placeholders.html # Image generator
├── README.md               # This file
└── assets/
    ├── music/              # Music files (add your tracks here)
    ├── logo.png            # Website logo
    ├── hero-artist.jpg     # Hero section image
    ├── about-artist.jpg    # About section image
    ├── latest-album.jpg    # Latest release cover
    ├── track1.jpg - track6.jpg # Track covers
    ├── video1.jpg - video4.jpg # Video thumbnails
    ├── featured-track1.jpg - featured-track3.jpg # Featured track covers
    └── experience1.jpg, experience2.jpg # Experience section images
```

## Customization

### Colors
The website uses a modern color palette. You can customize it by modifying the CSS variables in `styles.css`:

```css
/* Primary colors */
--primary-color: #ff6b6b;
--secondary-color: #4ecdc4;
--accent-color: #45b7d1;
```

### Music Player
To add your actual music tracks, update the `tracks` array in `script.js`:

```javascript
this.tracks = [
    {
        title: "Your Track Title",
        artist: "Your Name",
        src: "assets/music/your-track.mp3",
        cover: "assets/your-cover.jpg"
    }
    // Add more tracks...
];
```

### Contact Form
The contact form is ready to be connected to your backend service. Update the form action in `index.html` and add server-side processing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

## License

This project is open source and available under the MIT License.

## Credits

Inspired by the design and layout of [Jazim Sharma's official website](https://www.jazimsharma.com/).
