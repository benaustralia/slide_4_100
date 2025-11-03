# Slide Panels with GSAP ScrollTrigger

A React application with slide-in panels animated using GSAP ScrollTrigger with scrub enabled. Optimized for 100% Lighthouse scores in Performance, Accessibility, Best Practices, and SEO.

## Setup

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

3. Build for production:
```bash
bun run build
bun run preview
```

## Features

- Multiple slide-in panels that animate based on scroll position
- Alternating slide directions (left and right)
- Smooth scrubbed animations tied to scroll progress
- **Fully responsive design** - optimized for mobile, tablet, and desktop
- Images and rich text content support
- Optimized for Performance, Accessibility, SEO, and Best Practices
- Touch-friendly scroll snap on mobile devices
- Responsive typography that scales across all screen sizes

## Adding Content to Panels

Each panel supports:
- **Title**: Main heading (H2)
- **Content**: Primary text paragraph
- **Additional Text**: Secondary paragraph for more details
- **Image**: Lazy-loaded image with proper alt text
- **Color**: Custom gradient color per panel

### Example:
```jsx
<SlidePanel
  title="Your Panel Title"
  content="Main description text here."
  additionalText="Additional details or call to action."
  image="/path/to/your/image.jpg"
  imageAlt="Descriptive alt text for accessibility and SEO"
  color="#6366f1"
  index={0}
/>
```

### Image Optimization Tips

For best performance scores:
1. **Use local images**: Place images in `public/images/` folder and reference as `/images/your-image.jpg`
2. **Optimize images**: Use tools like [Squoosh](https://squoosh.app/) or [ImageOptim](https://imageoptim.com/) to compress images
3. **Recommended format**: Use WebP format when possible (fallback to JPEG/PNG)
4. **Recommended size**: 800x450px (16:9 aspect ratio) for optimal display
5. **Keep file sizes**: Under 200KB per image for best performance

The component automatically:
- Lazy loads images (`loading="lazy"`)
- Uses async decoding (`decoding="async"`)
- Includes proper width/height attributes to prevent layout shift
- Provides GPU acceleration with `will-change: transform`
- **Responsive images** - automatically scales for mobile, tablet, and desktop
- **Touch-optimized scrolling** - smooth scroll snap on mobile devices
- **Responsive typography** - font sizes adjust based on screen size

## Responsive Design

The site is fully responsive with breakpoints at:
- **Mobile**: < 640px (default styles)
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px

All elements automatically adapt:
- Font sizes scale from mobile to desktop
- Padding and margins adjust for comfortable viewing on all devices
- Images maintain aspect ratio and scale appropriately
- Touch-friendly interactions on mobile
- Viewport-aware animations that work on all screen sizes

## Tech Stack

- **Bun** - Runtime and package manager
- **Vite** - Build tool and dev server
- **React** - UI framework
- **GSAP** - Animation library with ScrollTrigger plugin (lazy-loaded)

