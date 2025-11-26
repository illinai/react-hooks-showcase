'use client';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function ThemeContent() {
  const { theme, toggleTheme } = useTheme();

  const containerStyle = {
    padding: '2rem',
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#000000' : '#ffffff',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: theme === 'light' ? '#333' : '#fff',
    color: theme === 'light' ? '#fff' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div className="page-container">
      <h1 className="page-title">useContext Hook</h1>
      <p className="page-description">
        useContext allows you to share data across the component tree without prop drilling. 
        Perfect for themes, user data, or app-wide settings. The example below demonstrates a that can 
        be toggled between light and dark modes using context.
      </p>

      <div className="example-container" style={containerStyle}>
        <h2>Example: Theme Switcher</h2>
        <p>Current theme: <strong>{theme}</strong></p>
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          This component uses context to access and modify the theme without passing props.
        </p>
        <button onClick={toggleTheme} style={buttonStyle}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default function UseContextPage() {
  return (
    <ThemeProvider>
      <ThemeContent />
    </ThemeProvider>
  );
}