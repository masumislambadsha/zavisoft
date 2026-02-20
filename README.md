# KICKS - Premium Sneakers E-commerce Store

A modern, responsive e-commerce platform built with Next.js 16, featuring smooth animations, dynamic product listings, and a fully functional shopping cart.

## 🎯 Project Overview

This project is a frontend implementation of a sneaker e-commerce store, translating Figma designs into a fully functional web application. It features product browsing, detailed product views, category navigation, and a complete shopping cart experience.

## 🚀 Live Demo

**Live URL:** [Add your deployment URL here]

## ✨ Features

- 🛍️ Dynamic product listing with API integration
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Pixel-perfect UI matching Figma designs
- 🛒 Functional shopping cart with add/remove/update quantity
- 🔄 Smooth scroll animations using Lenis
- ✨ GSAP animations for enhanced user experience
- 📦 Product detail pages with size and color selection
- 🏷️ Category browsing with carousel navigation
- ⚡ Loading, error, and empty states for all API calls
- 💾 Cart persistence using localStorage
- 🎭 Toast notifications for user actions

## 🛠️ Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Framework**        | Next.js 16 (App Router)      |
| **Language**         | TypeScript                   |
| **Styling**          | Tailwind CSS                 |
| **State Management** | React Context API            |
| **Data Fetching**    | Axios                        |
| **Animations**       | GSAP + Lenis (Smooth Scroll) |
| **UI Components**    | Lucide React (Icons)         |
| **Notifications**    | React Hot Toast              |
| **Alerts**           | SweetAlert2                  |

## 📁 Project Structure

```
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Categories.tsx   # Category carousel with GSAP
│   │   ├── Footer.tsx       # Footer with links and social
│   │   ├── Hero.tsx         # Hero section with animations
│   │   ├── Navbar.tsx       # Navigation with cart badge
│   │   ├── NewDrops.tsx     # Product grid
│   │   ├── ProductCard.tsx  # Product card component
│   │   ├── RelatedProducts.tsx
│   │   ├── Reviews.tsx      # Customer reviews
│   │   └── SmoothScroll.tsx # Lenis smooth scroll wrapper
│   ├── context/
│   │   └── CartContext.tsx  # Global cart state management
│   ├── cart/
│   │   └── page.tsx         # Shopping cart page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx     # Product detail page
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── public/                  # Static assets (images, icons)
└── package.json
```

## 🔌 API Integration

The project uses the Platzi Fake Store API:

- **Products:** `https://api.escuelajs.co/api/v1/products`
- **Categories:** `https://api.escuelajs.co/api/v1/categories`
- **Product Details:** `https://api.escuelajs.co/api/v1/products/{id}`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd zavisoft
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎨 Key Features Implementation

### 1. Shopping Cart (Bonus Feature)

- Add/remove products
- Update quantities
- Size and color selection
- Cart badge with item count
- Persistent cart using localStorage
- Order summary with delivery fee calculation

### 2. Animations (Bonus Feature)

- Smooth scroll using Lenis
- GSAP scroll-triggered animations
- Hover effects and transitions
- Image zoom on hover
- Staggered animations for product cards

### 3. State Management

- Context API for global cart state
- Local state for component-specific data
- Efficient re-rendering optimization

### 4. Error Handling

- Loading states with spinners
- Error states with retry buttons
- Empty states with helpful messages
- Toast notifications for user feedback

## 📝 Implementation Notes

- All components are client-side rendered using "use client" directive
- Images are optimized using Next.js Image component
- External images use `unoptimized` prop for API images
- Cart functionality is fully local (no backend required)
- Responsive design follows mobile-first approach
- Accessibility features included (aria-labels, semantic HTML)

## 🎯 Task Completion Checklist

- ✅ Next.js framework with App Router
- ✅ TypeScript implementation
- ✅ Tailwind CSS styling
- ✅ Context API for state management
- ✅ Axios for data fetching
- ✅ Product listing page
- ✅ Product detail page
- ✅ Category integration
- ✅ Responsive design (mobile + desktop)
- ✅ Loading/Error/Empty states
- ✅ **BONUS:** Cart page with full functionality
- ✅ **BONUS:** GSAP + Lenis animations
- ✅ Clean component architecture
- ✅ Meaningful commit history

## 🐛 Known Issues / Future Improvements

- Category page routes need implementation
- Search functionality can be added
- User authentication can be integrated
- Wishlist feature can be added
- Product filtering and sorting

## 👨‍💻 Author

**Zavisoft Frontend Task Submission**

## 📄 License

This project is created for the Zavisoft frontend assessment task.
