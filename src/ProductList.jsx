import React, { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onNavigate }) {
    const [view, setView] = useState('products'); // 'products' or 'cart'
    const dispatch = useDispatch();

    // Access Redux state for cart items
    const cartItems = useSelector((state) => state.cart?.items || []);
    const totalCartItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const plantsArray = [
        {
            category: 'Air Purifying Plants',
            plants: [
                {
                    name: 'Snake Plant',
                    image:
                        'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
                    description:
                        'Produces oxygen at night, improving air quality.',
                    cost: '$15',
                },
                {
                    name: 'Spider Plant',
                    image:
                        'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
                    description:
                        'Filters formaldehyde and xylene from the air.',
                    cost: '$12',
                },
                {
                    name: 'Peace Lily',
                    image:
                        'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
                    description: 'Removes mold spores and purifies the air.',
                    cost: '$18',
                },
            ],
        },
        {
            category: 'Aromatic Plants',
            plants: [
                {
                    name: 'Lavender',
                    image:
                        'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop',
                    description: 'Calming scent, used in aromatherapy.',
                    cost: '$20',
                },
                {
                    name: 'Jasmine',
                    image:
                        'https://cdn.pixabay.com/photo/2023/06/04/12/32/jasmine-8039559_960_720.jpg',
                    description:
                        'Known for its sweet and romantic fragrance.',
                    cost: '$15',
                },
            ],
        },
        {
            category: 'Culinary and Medicinal Plants',
            plants: [
                {
                    name: 'Mint',
                    image:
                        'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg',
                    description: 'Refreshing aroma, used in teas and cooking.',
                    cost: '$10',
                },
            ],
        },
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem({ ...plant, quantity: 1 }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setView('cart');
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setView('products');
    };

    const isPlantInCart = (plantName) => {
        return cartItems.some((item) => item.name === plantName);
    };

    return (
        <div className="product-list-wrapper">
            {/* Navbar */}
            <div className="navbar">
                {/* Left Section */}
                <div className="navbar-section luxury">
                    <img
                        src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                        alt="Paradise Nursery Logo"
                        className="navbar-logo"
                    />
                    <a
                        href="#landing"
                        className="navbar-link"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate('landing'); // Navigate back to the landing page
                        }}
                    >
                        <div>
                            <h3 className="navbar-title">Paradise Nursery</h3>
                            <i className="navbar-subtitle">
                                Where Green Meets Serenity
                            </i>
                        </div>
                    </a>
                </div>

                {/* Center Section */}
                <div className="navbar-section">
                    <a
                        href="#plants"
                        className="navbar-link"
                        onClick={(e) => {
                            e.preventDefault();
                            setView('products');
                        }}
                    >
                        Plants
                    </a>
                </div>

                {/* Right Section */}
                <div
                    className="navbar-section cart"
                    onClick={handleCartClick}
                >
                    <div className="cart-container">
                        {/* Shopping Cart Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            height="40"
                            width="40"
                        >
                            <rect width="256" height="256" fill="none"></rect>
                            <circle cx="80" cy="216" r="12"></circle>
                            <circle cx="184" cy="216" r="12"></circle>
                            <path
                                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                fill="none"
                                stroke="#faf9f9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                        {totalCartItems > 0 && (
                            <span className="cart-count">
                                {totalCartItems}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
                {/* Products View */}
                <div
                    className={`products-view ${view === 'products' ? 'visible' : ''
                        }`}
                >
                    <div className="product-grid">
                        {plantsArray.map((category, index) => (
                            <div key={index} className="product-list">
                                <h2 className="plant-heading">
                                    {category.category}
                                </h2>
                                <div className="product-list">
                                    {category.plants.map((plant) => (
                                        <div
                                            key={plant.name}
                                            className="product-card"
                                        >
                                            <img
                                                src={plant.image}
                                                alt={plant.name}
                                                className="product-image"
                                            />
                                            <h3 className="product-title">
                                                {plant.name}
                                            </h3>
                                            <p className="product-description">
                                                {plant.description}
                                            </p>
                                            <p className="product-price">
                                                {plant.cost}
                                            </p>
                                            <button
                                                className={`product-button ${isPlantInCart(plant.name)
                                                    ? 'added-to-cart'
                                                    : ''
                                                    }`}
                                                onClick={() =>
                                                    handleAddToCart(plant)
                                                }
                                                disabled={isPlantInCart(
                                                    plant.name
                                                )}
                                            >
                                                {isPlantInCart(plant.name)
                                                    ? 'Added to Cart'
                                                    : 'Add to Cart'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart View */}
                <div
                    className={`cart-view ${view === 'cart' ? 'visible' : ''
                        }`}
                >
                    <CartItem onContinueShopping={handleContinueShopping} />
                </div>
            </div>
        </div>
    );
}

export default ProductList;