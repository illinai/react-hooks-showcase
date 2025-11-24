'use client';
import { useRef, useState } from 'react';

export default function UseRefPage() {
  const nameInputRef = useRef(null);
  const gradeInputRef = useRef(null);
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const clickCountRef = useRef(0);
  const [submittedCount, setSubmittedCount] = useState(0);

  const focusNameInput = () => {
    nameInputRef.current.focus();
  };

  const focusGradeInput = () => {
    gradeInputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if fields are empty and focus the first empty one
    if (!studentName) {
      nameInputRef.current.focus();
      alert('Please enter a student name!');
      return;
    }
    
    if (!grade) {
      gradeInputRef.current.focus();
      alert('Please enter a grade!');
      return;
    }

    // Increment the ref without causing re-render
    clickCountRef.current += 1;
    
    alert(`Submitted! Student: ${studentName}, Grade: ${grade}`);
    setStudentName('');
    setGrade('');
  };

  const showClickCount = () => {
    // This will show how many times submit was attempted
    setSubmittedCount(clickCountRef.current);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">useRef Hook</h1>
      <p className="page-description">
        useRef has two main uses: (1) accessing DOM elements directly, and (2) storing values that persist between renders without causing re-renders.
      </p>

      <div className="example-container">
        <h2>Example 1: Auto-Focus Empty Fields</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Try submitting the form with empty fields - the form will automatically focus the first empty field!
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Student Name:</label>
            <input
              ref={nameInputRef}
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              style={inputStyle}
            />
            <button type="button" onClick={focusNameInput} style={{ ...buttonStyle, marginLeft: '0.5rem' }}>
              Focus This Field
            </button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Grade:</label>
            <input
              ref={gradeInputRef}
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade (9-12)"
              style={inputStyle}
            />
            <button type="button" onClick={focusGradeInput} style={{ ...buttonStyle, marginLeft: '0.5rem' }}>
              Focus This Field
            </button>
          </div>

          <button type="submit" style={buttonStyle}>
            Submit Student
          </button>
        </form>
      </div>

      <div className="example-container">
        <h2>Example 2: Counting Submissions Without Re-renders</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          We're tracking how many times you clicked submit using useRef. This counter increases without 
          causing the page to re-render each time!
        </p>
        
        <p>Submissions tracked (with useRef): <strong>{clickCountRef.current}</strong></p>
        <p>Times you clicked "Show Count": <strong>{submittedCount}</strong></p>
        
        <button onClick={showClickCount} style={buttonStyle}>
          Show Current Submission Count
        </button>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          <strong>💡 What's happening:</strong>
          <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
            <li>Every time you submit the form, <code>clickCountRef.current</code> increases</li>
            <li>This doesn't cause the component to re-render</li>
            <li>Click "Show Current Submission Count" to update the display and see the real count</li>
            <li>With useState, every increment would cause an immediate re-render</li>
          </ul>
        </div>
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
  width: '250px',
};