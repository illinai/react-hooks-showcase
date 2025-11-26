'use client';
import { useState, useMemo } from 'react';
import { mockStudents } from '@/data/mockData';

export default function UseMemoPage() {
  const [sortBy, setSortBy] = useState('name');
  const [minGPA, setMinGPA] = useState(0);
  const [calculationCount, setCalculationCount] = useState(0);

  // Expensive calculation to memoize
  const sortedAndFilteredStudents = useMemo(() => {
    setCalculationCount(prev => prev + 1);
    console.log('Calculating sorted and filtered students...');
    
    let filtered = mockStudents.filter(student => student.gpa >= minGPA);
    
    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'gpa') return b.gpa - a.gpa;
      if (sortBy === 'grade') return a.grade - b.grade;
      return 0;
    });
  }, [sortBy, minGPA]);

  return (
    <div className="page-container">
      <h1 className="page-title">useMemo Hook</h1>
      <p className="page-description">
        useMemo memoizes expensive calculations so they only re-run when dependencies change. 
        This optimizes performance by avoiding unnecessary recalculations. The example below 
        demonstrates sorting and filtering a list of students based on user-selected criteria.
      </p>

      <div className="example-container">
        <h2>Example: Filter and Sort Students</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Calculation count: <strong>{calculationCount}</strong> (only increases when filters change)
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
              <option value="name">Name</option>
              <option value="gpa">GPA</option>
              <option value="grade">Grade</option>
            </select>
          </div>

          <div>
            <label>Minimum GPA: </label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.1"
              value={minGPA}
              onChange={(e) => setMinGPA(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>
        </div>

        <p>Showing {sortedAndFilteredStudents.length} students</p>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Grade</th>
              <th style={thStyle}>GPA</th>
              <th style={thStyle}>Favorite Subject</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredStudents.map(student => (
              <tr key={student.id}>
                <td style={tdStyle}>{student.name}</td>
                <td style={tdStyle}>{student.grade}</td>
                <td style={tdStyle}>{student.gpa}</td>
                <td style={tdStyle}>{student.favoriteSubject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const selectStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ddd',
  marginLeft: '0.5rem',
};

const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ddd',
  marginLeft: '0.5rem',
  width: '100px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '1rem',
};

const thStyle = {
  textAlign: 'left',
  padding: '0.75rem',
  backgroundColor: '#333',
  color: 'white',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #ddd',
};