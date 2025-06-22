# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React frontend application for a wedding website built with:
- **React 19.1.0** with React Router DOM for navigation
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling with custom wedding theme colors
- **React Testing Library** for testing

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode (default for npm test)
npm test -- --watchAll

# Run specific test file
npm test -- --testNamePattern="ComponentName"
```

## Architecture

### Routing Structure
The app uses React Router DOM v7 with nested routes:
- `/` - Home page
- `/our-story` - Couple's story
- `/venue` - Wedding venue details
- `/rsvp` - RSVP form with backend integration
- `/style-guide` - Component style guide
- `*` - 404 Not Found page

### State Management
Redux Toolkit store is configured in `src/store/index.js` with:
- **RSVP slice** (`src/store/slices/rsvpSlice.js`) - Handles invitation validation and RSVP submissions with async thunks for API calls

### Component Structure
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   └── DarkModeToggle.js
│   └── layout/          # Layout components
│       ├── Layout.js    # Main layout wrapper with dark mode support
│       ├── Navbar.js    # Navigation header
│       └── Footer.js    # Site footer
├── pages/               # Page components
│   ├── Home.js
│   ├── OurStory.js
│   ├── Venue.js
│   ├── RSVP.js          # Form with Redux integration
│   ├── StyleGuide.js
│   └── NotFound.js
└── store/               # Redux state management
    ├── index.js         # Store configuration
    └── slices/
        └── rsvpSlice.js # RSVP state and API calls
```

## Styling System

### Tailwind Configuration
- Custom wedding color palette: pastel blue (primary), peach (secondary), mint (accent)
- Dark mode support enabled with class strategy
- Custom font families for elegant typography
- Responsive design utilities

### Theme Colors
- **Primary**: Pastel blue variants (`#91C3E5`)
- **Secondary**: Peach variants (`#FFC2AE`) 
- **Accent**: Mint variants (`#C9E4DE`)
- **Dark mode**: Custom dark backgrounds and text colors

## API Integration

### Environment Variables
- `REACT_APP_API_URL` - Backend API base URL for RSVP functionality

### RSVP Flow
1. Guest enters invitation code
2. `validateInvitationCode` thunk validates with backend (`/v1/api/invitation/validate/:code`)
3. Form pre-populates with existing RSVP data if available
4. `submitRsvp` thunk submits to backend (`/v1/api/rsvps`)

## Development Patterns

### Component Conventions
- Functional components with hooks
- Redux state managed through useSelector/useDispatch
- Tailwind classes for styling with dark mode variants
- Responsive design with mobile-first approach

### File Organization
- Components organized by purpose (common, layout, pages)
- Redux slices follow feature-based organization
- CSS-in-JS avoided in favor of Tailwind utilities