'use client';
import { useState, useCallback } from 'react';
import { mockLunchMenu } from '@/data/mockData';

export default function UseCallbackPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the menu based on search
  const filteredMenu = mockLunchMenu.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Without useCallback - new function created every time searchTerm changes
  const addItemWithoutCallback = (item) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // With useCallback - function only recreated when selectedItems changes
  const addItemWithCallback = useCallback((item) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  }, [selectedItems]);

  const removeItem = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">useCallback Hook</h1>
      <p className="page-description">
        useCallback prevents functions from being recreated on every render. This is useful when passing functions to child components or when you want to avoid unnecessary function recreation.
      </p>

      <div className="example-container">
        <h2>Example: Lunch Menu Selection</h2>
        
        <div style={{ padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px', marginBottom: '1.5rem' }}>
          <strong>What's happening:</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            As you type in the search box, the page re-renders to show filtered results. 
            Without useCallback, the "add item" function would be recreated every time you type, 
            even though the function logic hasn't changed. With useCallback, we only recreate 
            the function when the selected items actually change.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Search Menu:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to filter menu items..."
            style={inputStyle}
          />
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Showing {filteredMenu.length} of {mockLunchMenu.length} items
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {filteredMenu.map(item => (
            <div key={item.id} style={menuItemStyle}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 0.5rem 0' }}>
                {item.category}
              </p>
              <p style={{ fontWeight: 'bold', margin: '0 0 1rem 0' }}>
                ${item.price.toFixed(2)}
              </p>
              <button 
                onClick={() => addItemWithCallback(item)} 
                style={buttonStyle}
                disabled={selectedItems.find(i => i.id === item.id)}
              >
                {selectedItems.find(i => i.id === item.id) ? 'Added ✓' : 'Add to Order'}
              </button>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '2px solid #ddd', paddingTop: '1.5rem' }}>
          <h3>Your Order ({selectedItems.length} items)</h3>
          {selectedItems.length === 0 ? (
            <p style={{ color: '#666' }}>No items selected yet</p>
          ) : (
            <>
              <div style={{ marginBottom: '1rem' }}>
                {selectedItems.map(item => (
                  <div key={item.id} style={orderItemStyle}>
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} style={removeButtonStyle}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
                <strong style={{ fontSize: '1.2rem' }}>
                  Total: ${selectedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </strong>
                <button onClick={clearAll} style={{ ...buttonStyle, backgroundColor: '#d32f2f' }}>
                  Clear Order
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <strong>Key Point:</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Every time you type in the search box, the component re-renders to update the filtered list. 
            With useCallback on the "add item" function, we ensure it's only recreated when the selected 
            items change, not every time you type a letter. This is a small optimization here, but in larger 
            apps with many components, it prevents unnecessary work and improves performance.
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '2px solid #ddd',
  width: '100%',
  maxWidth: '400px',
};

const menuItemStyle = {
  border: '1px solid #ddd',
  padding: '1rem',
  borderRadius: '8px',
  backgroundColor: 'white',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  width: '100%',
};

const orderItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '0.5rem',
};

const removeButtonStyle = {
  padding: '0.25rem 0.75rem',
  backgroundColor: '#d32f2f',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem',
};