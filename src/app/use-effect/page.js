'use client';
import { useState, useEffect } from 'react';
import { mockStudents } from '@/data/mockData';

export default function UseEffectPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter students when grade changes
  useEffect(() => {
    console.log(`Filter changed to: ${selectedGrade}`);
  }, [selectedGrade]);

  const filteredStudents = selectedGrade === 'all' 
    ? students 
    : students.filter(s => s.grade === parseInt(selectedGrade));

  return (
    <div className="page-container">
      <h1 className="page-title">useEffect Hook</h1>
      <p className="page-description">
        useEffect handles side effects in components like data fetching, subscriptions, or DOM manipulation. It runs after render.
      </p>

      <div className="example-container">
        <h2>Example: Fetching Student Data</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label>Filter by Grade: </label>
          <select 
            value={selectedGrade} 
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={selectStyle}
          >
            <option value="all">All Grades</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : (
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
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{student.grade}</td>
                  <td style={tdStyle}>{student.gpa}</td>
                  <td style={tdStyle}>{student.favoriteSubject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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