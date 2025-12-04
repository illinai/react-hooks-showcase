import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const lastVisit = cookieStore.get('lastVisit')?.value;

  return (
    <div className="page-container">
      <h1 className="page-title">Welcome</h1>
      
      {lastVisit && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#d4edda', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          border: '1px solid #c3e6cb'
        }}>
          <strong>Welcome back!</strong> Your last visit was: {lastVisit}
        </div>
      )}

      <p className="page-description">
        This project project was created with Next.Js and it demonstrates practical 
        examples of the 7 main React hooks and custom hooks.
      </p>
      <div className="example-container">
        <h2>About This Project</h2>
        <p>
          Each page showcases a different React hook with a real-world example:
        </p>
        <ul style={{ marginTop: '1rem', marginLeft: '2rem', lineHeight: '1.8' }}>
          <li><strong>useState:</strong> Managing component state</li>
          <li><strong>useEffect:</strong> Handling side effects and data fetching</li>
          <li><strong>useRef:</strong> Accessing DOM elements and persisting values</li>
          <li><strong>useContext:</strong> Sharing data across components</li>
          <li><strong>useReducer:</strong> Managing complex state logic</li>
          <li><strong>useMemo:</strong> Optimizing expensive calculations</li>
          <li><strong>useCallback:</strong> Preventing unnecessary re-renders</li>
        </ul>
      </div>
    </div>
  );
}