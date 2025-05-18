# Setting Up Redux Toolkit and React Router DOM

This document explains how to set up and use Redux Toolkit for state management and React Router DOM for routing in a React application.

## Redux Toolkit Setup

### 1. Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Create Store

Create a store directory structure:

```
src/
└── store/
    ├── index.js        # Main store configuration
    └── slices/         # Feature slices directory
        ├── authSlice.js
        └── otherSlice.js
```

### 3. Configure the Store

In `src/store/index.js`:

```js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// Import other reducers as needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here
  },
});
```

### 4. Create a Slice

Example slice in `src/store/slices/authSlice.js`:

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
```

### 5. Wrap App with Provider

In your `src/index.js`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 6. Using Redux in Components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/slices/authSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const handleLogin = (userData) => {
    dispatch(loginSuccess(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // Your component JSX
  );
}
```

## React Router DOM Setup

### 1. Installation

```bash
npm install react-router-dom
```

### 2. Create Layout Component

Create a layout structure:

```
src/
└── components/
    └── layout/
        ├── Layout.js      # Main layout with nav, content, footer
        ├── Navbar.js
        └── Footer.js
```

Example `Layout.js`:

```jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
```

### 3. Set Up Routes

In your `App.js`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import RSVP from './pages/RSVP';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="rsvp" element={<RSVP />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 4. Creating Page Components

Example page component:

```jsx
function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Wedding</h1>
      <p className="mb-4">We are excited to celebrate our special day with you!</p>
      {/* More content */}
    </div>
  );
}

export default Home;
```

### 5. Navigation Between Pages

Using `<Link>` components in your Navbar:

```jsx
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            Casey & Yasmim
          </Link>
          <div className="space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-pink-500 font-medium" : "hover:text-pink-500"
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "text-pink-500 font-medium" : "hover:text-pink-500"
              }
            >
              Our Story
            </NavLink>
            <NavLink 
              to="/rsvp" 
              className={({ isActive }) => 
                isActive ? "text-pink-500 font-medium" : "hover:text-pink-500"
              }
            >
              RSVP
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

## Combining Redux and Router

When using both Redux and React Router, the setup should be:

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

## Protected Routes

For pages that require authentication:

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Usage in App.js
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
</Route>
```

## Best Practices

1. **Organize by Feature**: Keep related Redux logic and components together
2. **Use Redux DevTools**: Install the browser extension for debugging
3. **Code Splitting**: Use React Router's lazy loading for larger apps
4. **Redux Selectors**: Create reusable selectors for state access
5. **Consistent Route Structure**: Follow consistent naming patterns for routes