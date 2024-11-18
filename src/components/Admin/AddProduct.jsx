import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa íconos de Bootstrap
import './AddProduct.css'; // Archivo CSS

const AddProduct = ({ addProduct }) => {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProduct({ ...product, image: imageUrl });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(product);
        alert('Producto agregado correctamente');
        setProduct({ title: '', price: '', description: '', image: '' });
    };

    return (
        <div className="add-product-container">
            {/* Barra de navegación */}
            <div className="navbar-container">
                <nav className="navbar d-flex justify-content-center align-items-center">
                    <div className="navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar"
                                aria-label="Buscar"
                            />
                            <button
                                className="btn input-group-text"
                                onClick={() => alert('Buscando...')}
                            >
                                <i className="bi bi-search-heart"></i>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Formulario para agregar productos */}
            <div className="add-product-card">
                <div className="image-preview">
                    {product.image ? (
                        <img src={product.image} alt="Vista previa" />
                    ) : (
                        <p>Vista previa</p>
                    )}
                </div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="Título del producto"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Precio del producto"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Descripción del producto"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="add-product-btn">
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
