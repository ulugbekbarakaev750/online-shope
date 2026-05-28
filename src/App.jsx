import { useState } from 'react';
import './index.scss';

function App() {
    const [activeTab, setActiveTab] = useState('all');
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const products = [
        { id: 1, name: 'Худи', price: 250000, category: 'Худи', discount: 0, image: 'Худи.webp' },
        { id: 2, name: 'Свитшот', price: 320000, category: 'Свитшот', discount: 10, image: 'Свитшот.webp' },
        { id: 3, name: 'Рашгард', price: 180000, category: 'Рашгард', discount: 15, image: 'Рашгард.webp' },
        { id: 4, name: 'Майка-борцовка', price: 120000, category: 'Майка', discount: 0, image: 'Майка-борцовка.webp' },
        { id: 5, name: 'Джоггеры', price: 280000, category: 'Джоггеры', discount: 0, image: 'Джоггеры.webp' },
        { id: 6, name: 'Тайтсы', price: 150000, category: 'Тайтсы', discount: 20, image: 'Тайтсы.webp' },
        { id: 7, name: 'Баскетбольные шорты', price: 190000, category: 'Шорты', discount: 0, image: 'Баскетбольные шорты.webp' },
        { id: 8, name: 'Олимпийка', price: 420000, category: 'Олимпийка', discount: 5, image: 'Олимпийка.webp' },
        { id: 9, name: 'Ветровка', price: 380000, category: 'Ветровка', discount: 0, image: 'Ветровка.webp' },
        { id: 10, name: 'Анорак', price: 350000, category: 'Анорак', discount: 10, image: 'Анорак.jpg' },
        { id: 11, name: 'Поло', price: 160000, category: 'Поло', discount: 0, image: 'Поло.webp' },
        { id: 12, name: 'Спортивные носки', price: 45000, category: 'Носки', discount: 0, image: 'Спортивные носки.webp' }
    ];

    const categories = ['Все', 'Худи', 'Свитшот', 'Рашгард', 'Майка', 'Джоггеры', 'Тайтсы', 'Шорты', 'Олимпийка', 'Ветровка', 'Анорак', 'Поло', 'Носки'];

    const getFilteredProducts = () => {
        let filtered = products;
        
        if (activeTab === 'sale') {
            filtered = products.filter(p => p.discount > 0);
        } else if (activeTab === 'category' && activeCategory !== 'all') {
            filtered = products.filter(p => p.category === activeCategory);
        }
        
        if (sortBy === 'price-asc') {
            filtered = [...filtered].sort((a,b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filtered = [...filtered].sort((a,b) => b.price - a.price);
        }
        
        return filtered;
    };

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                if (newQty <= 0) return null;
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(Boolean));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const getTotalPrice = () => {
        return cart.reduce((sum, item) => {
            const priceWithDiscount = item.price * (1 - item.discount / 100);
            return sum + priceWithDiscount * item.quantity;
        }, 0);
    };

    const getOriginalPrice = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const getTotalDiscount = () => {
        return getOriginalPrice() - getTotalPrice();
    };

    const placeOrder = () => {
        alert('Заказ успешно оформлен!');
        setCart([]);
        setShowCart(false);
    };

    const filteredProducts = getFilteredProducts();

    return (
        <div className="app">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="logo">
                            <img src="/nike.png" alt="Nike" className="logo-img" />
                        </div>
                        
                        {/* Nav endi to'g'ridan-to'g'ri header ichida, o'rtada turadi */}
                        <nav className="nav">
                            <button className={activeTab === 'all' ? 'active' : ''} onClick={() => { setActiveTab('all'); setActiveCategory('all'); }}>Новинки</button>
                            <button className={activeTab === 'category' ? 'active' : ''} onClick={() => setActiveTab('category')}>Категории</button>
                            <button className={activeTab === 'sale' ? 'active' : ''} onClick={() => setActiveTab('sale')}>Скидки</button>
                            <button onClick={() => setShowContacts(true)}>Контакты</button>
                            <button onClick={() => setShowAbout(true)}>О нас</button>
                        </nav>

                        <button className="cart-icon" onClick={() => setShowCart(!showCart)}>
                            <img src="/basket.png" alt="basket" className="cart-img" />
                            <span className="cart-count">{cart.reduce((s,i) => s + i.quantity, 0)}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="container">
                    {activeTab === 'category' && (
                        <div className="categories-filter">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    className={activeCategory === (cat === 'Все' ? 'all' : cat) ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat === 'Все' ? 'all' : cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="filter-bar">
                        <div className="sort">
                            <span>По цене</span>
                            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                <option value="default">По умолчанию</option>
                                <option value="price-asc">Сначала дешевые</option>
                                <option value="price-desc">Сначала дорогие</option>
                            </select>
                            <button className="apply-btn">Применить</button>
                        </div>
                        <div className="total-count">Общее кол-во товаров: {filteredProducts.length}</div>
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={`/${product.image}`} alt={product.name} />
                                    {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                                </div>
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-price">
                                    {product.discount > 0 ? (
                                        <>
                                            <span className="old-price">{product.price.toLocaleString()} сум</span>
                                            <span className="new-price">{(product.price * (1 - product.discount/100)).toLocaleString()} сум</span>
                                        </>
                                    ) : (
                                        <span className="price">{product.price.toLocaleString()} сум</span>
                                    )}
                                </div>
                                <button className="buy-btn" onClick={() => addToCart(product)}>Купить</button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {showCart && (
                <div className="cart-modal">
                    <div className="cart-content">
                        <div className="cart-header">
                            <h2>Корзина</h2>
                            <button className="close-cart" onClick={() => setShowCart(false)}>X</button>
                        </div>
                        {cart.length === 0 ? (
                            <p className="cart-empty">Корзина пуста</p>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <p>{item.price.toLocaleString()} сум</p>
                                                {item.discount > 0 && <small>Скидка {item.discount}%</small>}
                                            </div>
                                            <div className="cart-item-controls">
                                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Удалить</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-total">
                                    <div className="total-row">Товаров на: {getOriginalPrice().toLocaleString()} сум</div>
                                    {getTotalDiscount() > 0 && <div className="total-row discount-row">Скидка: -{getTotalDiscount().toLocaleString()} сум</div>}
                                    <div className="total-row final">Итого: {getTotalPrice().toLocaleString()} сум</div>
                                </div>
                                <button className="checkout-btn" onClick={placeOrder}>Оформить заказ</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showContacts && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowContacts(false)}>X</button>
                        <h2>Контакты</h2>
                        <p>Телефон: +998 91 783 29 01</p>
                        <p>Email: sport.uzbekistan@gmail</p>
                        <p>Адрес: Tashkent City Mall, 2 этаж</p>
                        <p>Режим работы: 10:00 - 22:00</p>
                    </div>
                </div>
            )}

            {showAbout && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowAbout(false)}>X</button>
                        <h2>О нас</h2>
                        <p>Sport Store Uzbekistan</p>
                        <p>Локация: Tashkent City Mall</p>
                        <p>Since 2018 - 8 лет на рынке спортивной одежды</p>
                        <p>Оригинальная продукция с гарантией качества</p>
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="container">
                    <p>2026 Sport Store Founder: Ulugbek Barakayev, Uzbekistan Tashkent</p>
                </div>
            </footer>
        </div>
    );
}

export default App;