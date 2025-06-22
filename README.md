# 💒 Wedding App Frontend

A beautiful, responsive React frontend application for Casey & Yasmim's destination wedding in Punta Cana, Dominican Republic. Built with modern web technologies to provide guests with a seamless RSVP experience and wedding information.

## ✨ Features

### 🌟 Core Functionality
- **Invitation Code Validation**: Secure RSVP system with unique invitation codes
- **Interactive RSVP Form**: Complete guest response system with plus-one support
- **Real-time Wedding Countdown**: Dynamic countdown to the big day
- **Responsive Design**: Beautiful experience across all devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Wedding Information**: Comprehensive details about the celebration

### 📱 Pages & Components
- **Home**: Hero section with countdown and wedding overview
- **Our Story**: Journey of the couple (coming soon)
- **Venue**: Location details and travel information
- **RSVP**: Full-featured response system with backend integration
- **Style Guide**: Component library and design system

### 🎨 Design Features
- **Custom Wedding Theme**: Pastel blue, peach, and mint color palette
- **Elegant Typography**: Multiple font families for romantic styling
- **Smooth Animations**: CSS transitions and loading states
- **Image Integration**: Beautiful wedding and destination photography

## 🚀 Technology Stack

- **React 19.1.0** - Modern React with latest features
- **Redux Toolkit** - Predictable state management
- **React Router DOM v7** - Client-side routing with nested routes
- **Tailwind CSS** - Utility-first styling framework
- **React Testing Library** - Comprehensive testing suite

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wedding-app-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   REACT_APP_API_URL=your_backend_api_url
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`

## 📋 Available Scripts

```bash
# Development
npm start          # Start development server
npm test           # Run test suite in watch mode
npm run build      # Build for production
npm run eject      # Eject from Create React App (one-way operation)

# Testing
npm test -- --watchAll                    # Run all tests in watch mode
npm test -- --testNamePattern="RSVP"      # Run specific test file
npm test -- --coverage                    # Run tests with coverage report
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   │   └── DarkModeToggle.js
│   └── layout/          # Layout components
│       ├── Layout.js    # Main layout wrapper
│       ├── Navbar.js    # Navigation header
│       └── Footer.js    # Site footer
├── pages/               # Page components
│   ├── Home.js          # Landing page with countdown
│   ├── OurStory.js      # Couple's story page  
│   ├── Venue.js         # Wedding location details
│   ├── RSVP.js          # Interactive RSVP form
│   ├── StyleGuide.js    # Design system showcase
│   └── NotFound.js      # 404 error page
├── store/               # Redux state management
│   ├── index.js         # Store configuration
│   └── slices/
│       └── rsvpSlice.js # RSVP state and API calls
├── App.js               # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎯 RSVP System

### How It Works
1. **Guest receives invitation** with unique invitation code
2. **Code validation** against backend API (`/v1/api/invitation/validate/:code`)
3. **Form pre-population** with existing RSVP data if available
4. **Response submission** to backend (`/v1/api/rsvps`)
5. **Confirmation** with email notification option

### RSVP Features
- ✅ Invitation code validation
- ✅ Guest information pre-population
- ✅ Attendance confirmation (Yes/No)
- ✅ Plus-one guest management
- ✅ Dietary restrictions capture
- ✅ Email confirmation system
- ✅ Form persistence and updates
- ✅ Error handling and validation

## 🎨 Styling & Theme

### Color Palette
- **Primary**: Pastel Blue (`#91C3E5`) - Main brand color
- **Secondary**: Peach (`#FFC2AE`) - Accent color
- **Accent**: Mint (`#C9E4DE`) - Supporting color
- **Dark Mode**: Custom dark backgrounds and text colors

### Typography
- **Display**: Playfair Display (elegant headers)
- **Script**: Dancing Script (decorative text)
- **Body**: Quicksand (clean, readable)
- **Serif**: Cormorant Garamond (traditional elegance)

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Optimized for phones, tablets, and desktop

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_API_URL=https://your-backend-api.com
```

### Tailwind Configuration
Custom theme extensions in `tailwind.config.js`:
- Wedding color palette
- Custom font families
- Dark mode support
- Extended utility classes

## 🧪 Testing

The project uses React Testing Library for comprehensive testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test RSVP.test.js
```

### Testing Strategy
- Component rendering tests
- User interaction testing
- Redux state management testing
- API integration testing
- Accessibility testing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Options
- **Vercel**: Recommended for React apps
- **Netlify**: Easy static site deployment
- **AWS S3 + CloudFront**: Scalable cloud hosting
- **GitHub Pages**: Free hosting for public repos

### Environment Setup
1. Set production environment variables
2. Configure API endpoints
3. Set up custom domain (optional)
4. Enable HTTPS
5. Configure analytics (optional)

## 🤝 Development Workflow

### Getting Started
1. Check out the `CLAUDE.md` file for development guidance
2. Review the component structure in `src/components/`
3. Understand the Redux store setup in `src/store/`
4. Follow the established patterns for new components

### Code Style
- Functional components with hooks
- Tailwind utility classes for styling  
- Redux Toolkit for state management
- Responsive design patterns
- Dark mode compatibility

### Adding New Features
1. Create components in appropriate directories
2. Add Redux slices for state management if needed
3. Update routing in `App.js`
4. Add tests for new functionality
5. Update documentation

## 📝 API Integration

### Backend Requirements
The frontend expects a REST API with these endpoints:

```
GET  /v1/api/invitation/validate/:code  # Validate invitation code
POST /v1/api/rsvps                      # Submit RSVP response
```

### Expected API Response Format
```json
{
  "guest": {
    "id": "string",
    "firstName": "string",
    "lastName": "string", 
    "email": "string",
    "plusOneAllowed": boolean
  },
  "existingRsvp": {
    "attending": boolean,
    "bringingPlusOne": boolean,
    "plusOneName": "string",
    "dietaryRestrictions": "string",
    "guestEmail": "string"
  },
  "hasExistingRsvp": boolean
}
```

## 🎭 Wedding Details

- **Date**: April 10, 2026
- **Location**: Punta Cana, Dominican Republic  
- **Couple**: Casey & Yasmim
- **Theme**: Destination wedding with pastel color palette
- **RSVP Deadline**: February 10, 2026

## 📞 Support

For questions about the wedding or technical issues:
- **Wedding Info**: weddinginfo@example.com
- **Technical Support**: Check the GitHub issues

## 📄 License

This project is private and intended for personal use for Casey & Yasmim's wedding.

---

Made with ❤️ for Casey & Yasmim's special day