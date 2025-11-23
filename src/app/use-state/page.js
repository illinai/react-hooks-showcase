'use client';
import { useState } from 'react';

export default function UseStatePage() {
  const [count, setCount] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(studentName);
    setStudentName('');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">useState Hook</h1>
      <p className="page-description">
        useState allows you to add state to functional components. It returns a state value and a function to update it.
      </p>

      <div className="example-container">
        <h2>Example 1: Counter</h2>
        <p>Current count: <strong>{count}</strong></p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => setCount(count + 1)} style={buttonStyle}>
            Increment
          </button>
          <button onClick={() => setCount(count - 1)} style={buttonStyle}>
            Decrement
          </button>
          <button onClick={() => setCount(0)} style={buttonStyle}>
            Reset
          </button>
        </div>
      </div>

      <div className="example-container">
        <h2>Example 2: Student Name Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
        {submittedName && (
          <p style={{ marginTop: '1rem' }}>
            Welcome, <strong>{submittedName}</strong>!
          </p>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ddd',
  marginRight: '0.5rem',
};