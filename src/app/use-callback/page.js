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

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h1 className="page-title">useCallback Hook</h1>
      <p className="page-description">
        useCallback prevents functions from being recreated on every render. This is useful when passing 
        functions to child components or when you want to avoid unnecessary function recreation. The example 
        below shows how useCallback optimizes function references when filtering and selecting lunch items.
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

        <h3 style={{ marginTop: '1.5rem' }}>Available Items</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {filteredMenu.map(item => (
            <div key={item.id} style={menuItemStyle}>
              <h4>{item.name}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.category}</p>
              <p style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>${item.price.toFixed(2)}</p>
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

        <h3 style={{ marginTop: '2rem' }}>Your Order ({selectedItems.length} items)</h3>
        {selectedItems.length === 0 ? (
          <p>No items selected yet</p>
        ) : (
          <>
            {selectedItems.map(item => (
              <div key={item.id} style={cartItemStyle}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)} style={removeButtonStyle}>
                  Remove
                </button>
              </div>
            ))}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #333' }}>
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
              <button onClick={clearAll} style={{ ...buttonStyle, marginLeft: '1rem', backgroundColor: '#d32f2f' }}>
                Clear Order
              </button>
            </div>

          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ddd',
  width: '100%',
  maxWidth: '400px',
  marginBottom: '0.5rem',
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
};

const cartItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginTop: '0.5rem',
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