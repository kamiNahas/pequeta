import React, { useState, useEffect } from 'react';
import logo from '../../img/PEQUETA.png'; // Importa el logo desde la ruta especificada
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa los íconos de Bootstrap
import './ProductCatalogo.css'; // Importa los estilos personalizados

const ProductCatalogo = () => {
    // Estado para manejar los artículos en el carrito
    const [cartItems, setCartItems] = useState([]);
    // Estado para controlar la visibilidad del carrito
    const [showCart, setShowCart] = useState(false);
    // Estado para calcular el total del carrito
    const [total, setTotal] = useState(0);

    // Lista de productos disponibles
    const products = [
        { id: 1, name: "Remera Azul", description: "Remera de algodón azul", price: 2500, image: "https://via.placeholder.com/100/0000FF" },
        { id: 2, name: "Pantalón Negro", description: "Pantalón de vestir negro", price: 3500, image: "https://via.placeholder.com/100/000000" },
        { id: 3, name: "Camisa Blanca", description: "Camisa formal blanca", price: 3000, image: "https://via.placeholder.com/100/FFFFFF" },
        { id: 4, name: "Zapatos Marrones", description: "Zapatos de cuero marrón", price: 5500, image: "https://via.placeholder.com/100/8B4513" },
        { id: 5, name: "Gorra Roja", description: "Gorra de verano roja", price: 1000, image: "https://via.placeholder.com/100/FF0000" },
        { id: 6, name: "Bufanda Gris", description: "Bufanda de lana gris", price: 1200, image: "https://via.placeholder.com/100/808080" },
        { id: 7, name: "Chaleco Verde", description: "Chaleco de invierno verde", price: 4500, image: "https://via.placeholder.com/100/008000" },
        { id: 8, name: "Abrigo Beige", description: "Abrigo largo beige", price: 6500, image: "https://via.placeholder.com/100/F5F5DC" }
    ];

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item.name === product.name);
        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementa su cantidad
            setCartItems(cartItems.map(item =>
                item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Si no está en el carrito, agrégalo con cantidad 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Incrementa la cantidad de un producto en el carrito
    const incrementQuantity = (productName) => {
        setCartItems(cartItems.map(item =>
            item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    // Disminuye la cantidad de un producto en el carrito
    const decrementQuantity = (productName) => {
        setCartItems(cartItems.map(item =>
            item.name === productName && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // Elimina un producto del carrito
    const removeFromCart = (productName) => {
        setCartItems(cartItems.filter(item => item.name !== productName));
    };

    // Calcula el total del carrito cuando cambian los artículos
    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }, [cartItems]);

    // Genera el mensaje para WhatsApp con los detalles del carrito
    const generateWhatsAppMessage = () => {
        let message = "Hola, me gustaría realizar la siguiente compra:\n\n";
        cartItems.forEach(item => {
            message += `Producto: ${item.name}\nCantidad: ${item.quantity}\nSubtotal: $${(item.price * item.quantity).toLocaleString()}\n\n`;
        });
        message += `Total: $${total.toLocaleString()}\n\nGracias.`;
        return encodeURIComponent(message); // Codifica el mensaje para usarlo en la URL
    };

    return (
        <div className="navbar-container">
            {/* Barra de navegación */}
            <nav className="navbar d-flex justify-content-between align-items-center mx-auto">
                {/* Logo */}
                <div className="navbar-logo d-flex align-items-center">
                    <a href="/" className="navbar-brand d-flex align-items-center">
                        <img src={logo} alt="Logo" width="160" height="75" className="me-2" />
                    </a>
                </div>
                {/* Barra de búsqueda */}
                <div className="navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Buscar" aria-label="Buscar" />
                        <button className="btn input-group-text" onClick={() => alert('Buscando...')}>
                            <i className="bi bi-search-heart"></i>
                        </button>
                    </div>
                </div>
                {/* Botón del carrito */}
                <div className="navbar-cart d-flex align-items-center">
                    <button type="button" className="btn position-relative" onClick={() => setShowCart(true)}>
                        <i className="bi bi-cart3" style={{ fontSize: '1.5rem', color: '#8e99a2' }}></i>
                        {cartItems.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartItems.length} {/* Muestra el número de artículos en el carrito */}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
            {/* Catálogo de productos */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    {products.map(product => (
                        <div key={product.id} className="col-md-6 mb-4">
                            <div className="card mb-3 product-card" style={{ maxWidth: '540px' }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text">${product.price.toLocaleString()}</p>
                                            <button className="btn custom-add-to-cart-btn" onClick={() => addToCart(product)}>
                                                Agregar al Carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal del carrito */}
            {showCart && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-white">
                                <h5 className="modal-title">Carrito de Compras</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCart(false)}></button>
                            </div>
                            <div className="modal-body bg-white">
                                {cartItems.length === 0 ? (
                                    <p>El carrito está vacío</p>
                                ) : (
                                    <div>
                                        {cartItems.map((item, index) => (
                                            <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-2">
                                                <div>
                                                    <h6>{item.name}</h6>
                                                    <p>Cantidad: {item.quantity}</p>
                                                    <p>Total: ${(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <button className="btn btn-light btn-sm" onClick={() => decrementQuantity(item.name)}>-</button>
                                                    <button className="btn btn-light btn-sm mx-2" onClick={() => incrementQuantity(item.name)}>+</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.name)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer bg-white">
                                <h5>Total: ${total.toLocaleString()}</h5>
                                <button type="button" className="btn custom-add-to-cart-btn" onClick={() => setCartItems([])}>Vaciar</button>
                                <a
                                    href={`https://wa.me/3816764784?text=${generateWhatsAppMessage()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn custom-add-to-cart-btn"
                                >
                                    Comprar
                                </a>
                                <button type="button" className="btn btn-dark" onClick={() => setShowCart(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCatalogo;
