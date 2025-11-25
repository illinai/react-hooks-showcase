'use client';
import { useReducer } from 'react';
import { mockLunchMenu } from '@/data/mockData';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    
    case 'CLEAR_CART':
      return { items: [] };
    
    default:
      return state;
  }
};

export default function UseReducerPage() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="page-container">
      <h1 className="page-title">useReducer Hook</h1>
      <p className="page-description">
        useReducer is ideal for managing complex state logic with multiple actions. It's similar to Redux but built into React.
      </p>

      <div className="example-container">
        <h2>Example: Lunch Menu Cart</h2>
        
        <h3 style={{ marginTop: '1.5rem' }}>Available Items</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {mockLunchMenu.map(item => (
            <div key={item.id} style={menuItemStyle}>
              <h4>{item.name}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.category}</p>
              <p style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>${item.price.toFixed(2)}</p>
              <button onClick={() => addToCart(item)} style={buttonStyle}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: '2rem' }}>Cart ({cart.items.length} items)</h3>
        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.items.map(item => (
              <div key={item.id} style={cartItemStyle}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} style={removeButtonStyle}>
                  Remove
                </button>
              </div>
            ))}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #333' }}>
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
              <button onClick={clearCart} style={{ ...buttonStyle, marginLeft: '1rem', backgroundColor: '#d32f2f' }}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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