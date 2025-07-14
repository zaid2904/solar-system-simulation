# 3D Solar System Simulation

A stunning interactive 3D solar system simulation built with Three.js, featuring realistic planetary orbits, real-time speed controls, and immersive user interactions.

![Solar System Preview](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🌟 Features

### Core Features
- **Realistic 3D Solar System**: All 8 planets (Mercury to Neptune) with accurate relative sizes and distances
- **Smooth Orbital Animation**: Planets orbit the Sun with realistic speed ratios
- **Interactive Speed Controls**: Individual sliders for each planet's orbital speed (0x to 5x speed)
- **Real-time Animation**: Pause/Resume and Reset functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features
- **Interactive Camera Controls**: 
  - Mouse drag to rotate view
  - Right-click drag to pan
  - Scroll wheel to zoom in/out
- **Planet Information Tooltips**: Hover over planets to see detailed information
- **Beautiful Starfield Background**: Thousands of animated stars
- **Dark/Light Theme Toggle**: Switch between dark and light UI themes
- **Realistic Lighting**: Dynamic lighting from the Sun with shadows
- **Orbit Visualization**: Subtle orbit paths for each planet

### Technical Highlights
- **Pure JavaScript**: No frameworks, just vanilla JS with Three.js
- **Performance Optimized**: Smooth 60fps animation with efficient rendering
- **Cross-browser Compatible**: Works on all modern browsers
- **Mobile Responsive**: Touch-friendly controls and adaptive UI
- **Loading Screen**: Elegant loading animation while assets initialize

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge, brave)
- Internet connection (for Three.js CDN)

### Installation & Setup

1. **Clone or Download** this repository to your local machine

2. **Navigate** to the project directory:
   ```bash
   cd solar-system
   ```

3. **Serve the files** using one of these methods:

   **Option A: Using Python (Recommended)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js**
   ```bash
   # Install a simple HTTP server
   npm install -g http-server
   
   # Start the server
   http-server
   ```

   **Option C: Using PHP**
   ```bash
   php -S localhost:8000
   ```

   **Option D: Using Live Server (VS Code)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

4. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

### Alternative Setup (Direct File Opening)
⚠️ **Note**: Due to CORS policies, some browsers may not load Three.js properly when opening files directly. Using a local server is recommended.

If you want to try opening directly:
1. Double-click `index.html`
2. If it doesn't work, use one of the server methods above

## 🎮 How to Use

### Navigation Controls
- **Rotate View**: Left-click and drag
- **Pan**: Right-click and drag (or Ctrl+drag on Mac)
- **Zoom**: Scroll wheel or pinch on mobile
- **Reset Camera**: Click the "Reset" button

### Speed Controls
- Use the sliders in the control panel to adjust each planet's orbital speed
- Range: 0x (stopped) to 5x (5 times normal speed)
- Changes apply instantly without interrupting the animation

### Animation Controls
- **Pause/Resume**: Click the pause button to stop/start all planetary motion
- **Reset**: Restore all planets to default speeds and random positions

### Theme Toggle
- Click the moon/sun icon to switch between dark and light themes

### Planet Information
- Hover over any planet or the Sun to see detailed information
- Learn about surface temperatures, composition, and interesting facts

## 🔧 Project Structure

```
solar-system/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Three.js simulation logic
├── readme.md           # This documentation
└── assets/             # Additional assets (currently empty)
```

## 🌍 Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 50+ | Full support |
| Firefox | 45+ | Full support |
| Safari | 10+ | Full support |
| Edge | 79+ | Full support |
| Mobile Safari | 10+ | Touch controls |
| Chrome Mobile | 50+ | Touch controls |

## 📱 Mobile Support

The application is fully responsive and includes:
- Touch-friendly controls
- Adaptive UI layout
- Bottom-positioned control panel on mobile
- Optimized performance for mobile devices

## 🎨 Customization

### Adding New Planets or Objects
Edit the `planetData` array in `script.js`:
```javascript
{
    name: 'Pluto',
    size: 0.1,
    distance: 60,
    speed: 0.004,
    color: 0x8C7853,
    info: 'Former ninth planet, now classified as a dwarf planet.'
}
```

### Modifying Colors and Themes
Update CSS custom properties in `style.css`:
```css
:root {
    --accent-color: #your-color;
    --panel-bg: rgba(your, values, here);
}
```

### Adjusting Performance
Modify these settings in `script.js`:
- `starVertices` count for star field density
- Geometry segments for planet detail level
- Shadow map resolution for quality vs performance

## 🐛 Troubleshooting

### Common Issues

**1. Three.js Not Loading**
- Check internet connection
- Verify CDN links in `index.html`
- Try refreshing the page

**2. Blank Screen**
- Ensure you're using a local server
- Check browser console for errors
- Verify browser compatibility

**3. Poor Performance**
- Close other browser tabs
- Try reducing star field density
- Use a more powerful device

**4. Mobile Issues**
- Enable hardware acceleration in browser
- Close other apps to free memory
- Use the latest browser version

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Realistic planet textures
- [ ] Moon orbits around planets
- [ ] Asteroid belt visualization
- [ ] Sound effects and ambient music
- [ ] VR/AR support
- [ ] Time scale controls (years, months, days)
- [ ] Historical planet positions
- [ ] Educational quiz mode

## 🙏 Acknowledgments

- **Three.js**: Amazing 3D graphics library
- **NASA**: For planetary data and inspiration
- **Web Community**: For tutorials and documentation
