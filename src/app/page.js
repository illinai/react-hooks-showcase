export default function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome</h1>
      <p className="page-description">
        This project demonstrates practical examples of the React hooks.
      </p>
      <div className="example-container">
        <h2>About This Project</h2>
        <p>
          Each page showcases a different React hook with an example:
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
