import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cartItems, foodList, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
    const [promoCode, setPromoCode] = useState('')
    const [deliveryFee, setDeliveryFee] = useState(6) // Assume a fixed delivery fee of 6

    const navigate = useNavigate()

    const applyPromoCode = () => {
        // Example promo code logic
        if (promoCode === 'DISCOUNT10') {
            alert('Promo code applied successfully!')
        } else {
            alert('Invalid promo code')
        }
    }

    const totalAmount = getTotalCartAmount()
    const finalAmount = totalAmount > 0 ? totalAmount + deliveryFee : 0

    return (
        <div className='cart'>
            <div className="cart-title">
                <h2>Your Cart</h2>
            </div>
            <div className="cart-items">
                <div className="cart-items-header">
                    <p>Image</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Actions</p>
                </div>
                <hr />
                {foodList.map((item, index) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div className="cart-item" key={index}>
                                <img src={`http://localhost:8000${item.image}`} alt={item.name} className="cart-item-image" />
                                <p>{item.name}</p>
                                <p>Rs {item.price}</p>
                                <p>{cartItems[item.id]}</p>
                                <p>Rs {(item.price * cartItems[item.id]).toFixed(2)}</p>
                                <div className="cart-item-actions">
                                    <button className='remove_btn' onClick={() => removeFromCart(item.id)}>Remove</button>
                                    <button className='add_btn' onClick={() => addToCart(item.id)}>Add</button>
                                </div>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
            <div className="promo-code-section">
                <p>If you have a promo code, enter it below:</p>
                <div className="promo-code">
                    <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button onClick={applyPromoCode}>Apply</button>
                </div>
            </div>
            <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-item">
                    <p>Total Amount:</p>
                    <p>Rs {totalAmount.toFixed(2)}</p>
                </div>
                <div className="summary-item">
                    <p>Delivery Fee:</p>
                    <p>Rs {totalAmount === 0 ? 0 : deliveryFee}</p>
                </div>
                <div className="summary-item final-amount">
                    <p>Final Amount:</p>
                    <p>Rs {finalAmount.toFixed(2)}</p>
                </div>
                <button onClick={() => navigate('/order')} className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Cart
