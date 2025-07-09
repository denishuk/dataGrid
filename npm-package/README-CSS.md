# DataTable CSS Integration Guide

This package includes a standalone CSS file (`datatable.css`) that contains all the necessary styles for the DataTable component to work properly in external applications where Tailwind CSS classes might be purged.

## Usage Options

### Option 1: Import CSS in your bundler (Recommended)

```javascript
// Import the component and CSS
import { DataTable } from 'advanced-react-datatable';
import 'advanced-react-datatable/dist/datatable.css';
```

### Option 2: Include CSS in your HTML

```html
<!-- In your HTML head -->
<link rel="stylesheet" href="node_modules/advanced-react-datatable/dist/datatable.css">
```

### Option 3: Copy CSS to your project

Copy the `datatable.css` file to your project and include it in your build process.

## What's Included

The CSS file contains:

- **Base styles and resets** for consistent rendering
- **Action bar styles** with gradient backgrounds and hover effects
- **Table container styles** with scrollbar customization
- **Header and row styles** with pinned column support
- **Responsive design** with mobile-first approach
- **Filter and dropdown styles** with proper z-index stacking
- **Pagination and footer styles** with consistent spacing
- **Animation and transition effects** for smooth interactions
- **Accessibility features** like focus states and screen reader support

## CSS Class Structure

All CSS classes are prefixed with `datatable-` to avoid conflicts:

- `.datatable-container` - Main container
- `.datatable-action-bar` - Top action bar
- `.datatable-table-container` - Table wrapper
- `.datatable-header` - Table header
- `.datatable-row` - Table rows
- `.datatable-pagination` - Pagination controls
- And many more...

## Customization

You can override any styles by adding your own CSS after importing the datatable CSS:

```css
/* Override action bar background */
.datatable-action-bar {
  background: your-custom-gradient;
}

/* Override table colors */
.datatable-row:hover {
  background-color: your-custom-color;
}
```

## Performance Notes

- The CSS file is optimized and minified for production
- Uses modern CSS features like CSS Grid and Flexbox
- Includes smooth transitions and animations
- Responsive design with mobile breakpoints
- Efficient scrollbar styling for different browsers

## Browser Support

The CSS is compatible with:
- Chrome/Edge (modern versions)
- Firefox (modern versions)
- Safari (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Size

The standalone CSS file is approximately 15KB gzipped, ensuring fast loading times while providing comprehensive styling for all DataTable features.