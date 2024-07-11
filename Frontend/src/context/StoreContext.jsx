import { createContext, useEffect, useState } from "react";
import axios from "axios"; 

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [menuList, setMenuList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchUsername();
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setUsername('');
        }
    }, [token]);

    const fetchUsername = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user/', {
              headers: { Authorization: `Token ${token}` }
            });
            setUsername(response.data.username);
            localStorage.setItem('username', response.data.username);
        } catch (error) {
            console.error("Error fetching username", error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories/');
                setMenuList(response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        const fetchFoodItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/food-items/');
                setFoodList(response.data);
            } catch (error) {
                console.error("Error fetching food items", error);
            }
        };

        fetchCategories();
        fetchFoodItems();
    }, []);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product.id === parseInt(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        foodList,
        menuList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        username,
        setUsername
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
