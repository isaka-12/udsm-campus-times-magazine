# Campus Times Magazine - UDSM

Campus Times Magazine is a group project done as part of software engineering assignment to learn collaboration using git and github. This is a modern, responsive web magazine featuring campus news, events, and student stories with an academic blue and gold color scheme.

## 📋 Table of Contents
- [Project Structure](#project-structure)
- [Color Scheme](#color-scheme)
- [Getting Started](#getting-started)
- [Using Reusable Components](#using-reusable-components)
- [Customization](#customization)
- [Development](#development)


## Project Structure

```
udsm-campus-times-magazine/
├── index.html              # Main homepage
├── README.md              # This file
├── assets/                # Images and media files
├── pages/                 # HTML pages and components
│   ├── navbar.html        # Reusable navbar component
│   ├── footer.html        # Reusable footer component
│   └── [other pages]      # Technology, Sports, Education, etc.
├── scripts/               # JavaScript files
│   └── components.js      # Component loader and navigation logic
└── styles/                # CSS stylesheets
    ├── variables.css      # Color and design variables
    ├── main.css          # Global styles
    └── components.css    # Navbar and footer styles
```

## Color Scheme

The project uses an academic blue and gold color palette defined in `styles/variables.css`:

### Primary Colors
- **Academic Blue**: `#003366` - Main brand color
- **Academic Gold**: `#FFD700` - Accent and highlight color

### Secondary Colors
- **Light Blue**: `#1E5A8E`
- **Dark Blue**: `#001F3F`
- **Light Gold**: `#FFEB99`
- **Dark Gold**: `#B8860B`

### Usage
All colors are defined as CSS variables for easy customization:
```css
var(--academic-blue)
var(--academic-gold)
var(--light-blue)
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended for dynamic component loading)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/isaka-12/udsm-campus-times-magazine.git
   cd udsm-campus-times-magazine
   ```

2. **Open with a local server**
     
   Using VS Code Live Server:
   - Install Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open in browser**
   ```
   use liveserver 
   ```

## 🔧 Using Reusable Components

The navbar and footer are reusable components that load dynamically on every page. This approach ensures consistency across the site and makes updates easier - change the component once and it updates everywhere!

### How It Works

1. **Component Files**: The navbar and footer HTML are stored as separate files in the `pages/` directory
2. **Placeholders**: Each page includes empty `<div>` elements with specific IDs
3. **Dynamic Loading**: JavaScript automatically fetches and injects the component HTML
4. **Smart Path Resolution**: The script detects your page location and adjusts all links automatically

### Implementation Steps

### Step 1: Include Required CSS Files

Always include these stylesheets in your `<head>` section (adjust paths based on location):

**For root-level pages:**
```html
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/main.css">
<link rel="stylesheet" href="styles/components.css">
```

**For pages in subdirectories:**
```html
<link rel="stylesheet" href="../styles/variables.css">
<link rel="stylesheet" href="../styles/main.css">
<link rel="stylesheet" href="../styles/components.css">
```

### Step 2: Add Component Placeholders

Add these two `<div>` elements in your HTML body:

```html
<!-- Navbar Placeholder (at the top of <body>) -->
<div id="navbar-placeholder"></div>

<!-- Your page content here -->

<!-- Footer Placeholder (at the bottom of <body>) -->
<div id="footer-placeholder"></div>
```

### Step 3: Include the Component Loader Script

Add this script tag before the closing `</body>` tag (adjust path based on location):

**For root-level pages:**
```html
<sc#ript src="scripts/components.js"></script>
```

**For pages in subdirectories:**
```html
<script src="../scripts/components.js"></script>
```

### Complete Examples

#### For Pages in Root Directory (like index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    
    <!-- CSS Stylesheets -->
    <link rel="stylesheet" href="../styles/variables.css">
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/components.css">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navbar Placeholder -->
    <div id="navbar-placeholder"></div>
    
    <!-- Your Main Content -->
    <main class="main-content">
        <div class="container">
            <h1>Your Content Here</h1>
        </div>
    </main>
    
    <!-- Footer Placeholder -->
    <div id="footer-placeholder"></div>
    
    <!-- JavaScript -->
    <script src="scripts/components.js"></script>
</body>
</html>
```

### For Pages in Subdirectories (like pages/technology.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    
    <!-- CSS Stylesheets (adjust paths with ../) -->
    <link rel="stylesheet" href="../styles/variables.css">
    <link rel="stylesheet" href="../styles/main.css">
    <link rel="stylesheet" href="../styles/components.css">
    
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navbar Placeholder -->
    <div id="navbar-placeholder"></div>
    
    <!-- Your Main Content -->
    <main class="main-content">
        <div class="container">
            <h1>Your Content Here</h1>
        </div>
    </main>
    
    <!-- Footer Placeholder -->
    <div id="footer-placeholder"></div>
    
    <!-- JavaScript (adjust path with ../) -->
    <script src="../scripts/components.js"></script>
</body>
</html>
```

### Troubleshooting

**Problem**: Navbar or footer doesn't appear  
**Solutions**:
- Ensure you're using a local web server (not opening files directly)
- Check that placeholder IDs are correct: `navbar-placeholder` and `footer-placeholder`
- Verify CSS and JS file paths match your file location
- Open browser console (F12) to check for error messages

**Problem**: Links don't work correctly  
**Solutions**:
- The JavaScript automatically fixes links - ensure `components.js` is loading
- Check browser console for JavaScript errors
- Verify the component files exist at `pages/navbar.html` and `pages/footer.html`

**Problem**: Styling looks incorrect  
**Solutions**:
- Verify all CSS files are loaded in the correct order
- Check that paths to CSS files are correct (use `../` for subdirectories)
- Clear browser cache and refresh

### Modifying Components

To update the navbar or footer across all pages:

1. **Edit Component File**: Modify `pages/navbar.html` or `pages/footer.html`
2. **Refresh**: All pages using these components will automatically show the changes
3. **No Need to Update Individual Pages**: Changes apply everywhere automatically

**Example - Adding a New Menu Item:**

Edit `pages/navbar.html`:
```html
<ul class="navbar-nav">
    <li><a href="index.html">Home</a></li>
    <li><a href="pages/your-new-page.html">New Page</a></li>
    <!-- ... other items ... -->
</ul>
```

Save the file, and the new menu item appears on all pages!

`

### Modifying Navigation Links

Edit `pages/navbar.html` to add/remove menu items:

```html
<ul class="navbar-nav">
    <li><a href="index.html">Home</a></li>
    <li><a href="pages/your-page.html">Your Page</a></li>
    <!-- Add more items here -->
</ul>
```

### Updating Footer Content

Edit `pages/footer.html` to customize footer sections, links, and social media:

```html
<div class="footer-section">
    <h3>Your Section Title</h3>
    <!-- Your content -->
</div>
```
## Development

### Adding New Pages

1. Create a new HTML file in the `pages/` directory
2. Copy the template structure from above
3. Adjust CSS/JS paths based on file location
4. Add your content between the navbar and footer placeholders
5. Update navbar links if needed

### Component Structure

**Navbar Component** (`pages/navbar.html`):
- Responsive navigation menu
- Mobile hamburger toggle
- Dropdown-ready structure

**Footer Component** (`pages/footer.html`):
- Multi-column layout
- Quick links section
- Social media icons
- Copyright information

**Component Loader** (`scripts/components.js`):
- Dynamically loads navbar and footer
- Handles mobile menu toggle
- Highlights active page in navigation

### Styling Guidelines

1. Use CSS variables for colors and spacing
2. Follow the established naming conventions
3. Maintain responsive design principles
4. Test on multiple screen sizes
5. Keep accessibility in mind (use semantic HTML, ARIA labels)

## Responsive Breakpoints

- **Desktop**: > 768px (full navigation menu)
- **Mobile**: ≤ 768px (hamburger menu)

## Contributing & Git Workflow

Follow these steps to collaborate on the project using Git and GitHub:

### Step 1: Clone the Repository

```bash
git clone https://github.com/isaka-12/udsm-campus-times-magazine.git
cd udsm-campus-times-magazine
```

### Step 2: Create a Branch

Create a new branch using your name and the page you're working on:

```bash
git checkout -b yourname-yourpage
```

**Example:**
```bash
git checkout -b isaka-technology
```

### Step 3: Create Your Page

1. Create a page inside the **`pages/`** folder using the **feature name** (e.g., `technology.html`) in your preferred code editor
2. **Edit only your assigned HTML file**
3. Use the reusable component structure (see [Using Reusable Components](#using-reusable-components))

### Step 4: Commit and Push Your Changes

```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "Add [your page name] page"

# Push to your branch
git push origin yourname-yourpage
```

### Step 5: Create a Pull Request

1. Go to the GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch and create the PR
4. Wait for review and approval

### Important Rules

- ⚠️ **Only edit your assigned page**
- ✅ Always work on your own branch
- 🔄 Pull latest changes before starting: `git pull origin main`
- 📝 Write clear commit messages
- 🧪 Test your page locally before pushing

## License

This project is part of a software engineering assignment at UDSM.

## Team

- Isaka Mtweve - Group Leader
- Abdulazizi Masolwa.
- Hope Japhet.
- John Marandu.
- Vistar Lyimo.
- Brian Kimwaga.
- BENJAMIN MASHIMBA.
- HENDRICK MARTIN.
- MASOUD MASOUD.
- KHAYYAM M. HABIB.





