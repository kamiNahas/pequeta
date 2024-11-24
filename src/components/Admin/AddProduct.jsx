import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa los íconos de Bootstrap
import './AddProduct.css'; // Archivo CSS para estilos personalizados

// Componente para agregar un producto
const AddProduct = ({ addProduct }) => {
    // Estado local para manejar los datos del producto
    const [product, setProduct] = useState({
        title: '', // Título del producto
        price: '', // Precio del producto
        description: '', // Descripción del producto
        image: '', // URL de la imagen del producto
    });

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y valor del campo
        setProduct({ ...product, [name]: value }); // Actualiza el estado del producto
    };

    // Maneja el cambio del archivo de imagen y genera una URL para la vista previa
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Genera una URL para la vista previa
            setProduct({ ...product, image: imageUrl }); // Actualiza el estado con la URL de la imagen
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        addProduct(product); // Llama a la función `addProduct` con los datos del producto
        alert('Producto agregado correctamente'); // Muestra una alerta de éxito
        setProduct({ title: '', price: '', description: '', image: '' }); // Reinicia el formulario
    };

    return (
        <div className="add-product-container">
            {/* Barra de navegación */}
            <div className="navbar-container">
                <nav className="navbar d-flex justify-content-center align-items-center">
                    {/* Barra de búsqueda */}
                    <div className="navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar" // Placeholder del campo de búsqueda
                                aria-label="Buscar"
                            />
                            <button
                                className="btn input-group-text"
                                onClick={() => alert('Buscando...')} // Acción al hacer clic en buscar
                            >
                                <i className="bi bi-search-heart"></i> {/* Icono de búsqueda */}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Tarjeta con formulario para agregar productos */}
            <div className="add-product-card">
                {/* Vista previa de la imagen */}
                <div className="image-preview">
                    {product.image ? (
                        <img src={product.image} alt="Vista previa" /> // Muestra la imagen seleccionada
                    ) : (
                        <p>Vista previa</p> // Texto por defecto si no hay imagen
                    )}
                </div>
                {/* Formulario */}
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="Título del producto" // Campo para el título
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Precio del producto" // Campo para el precio
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Descripción del producto" // Campo para la descripción
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="file"
                            accept="image/*" // Solo permite archivos de imagen
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" className="add-product-btn">
                        Agregar {/* Botón para enviar el formulario */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
