const express = require('express');
const router = express.Router();

// Array de productos (simulando una base de datos)
const products = [
    {
        nombre: "snapy",
        precio: 25000,
        stock: 50,
        categoria: "juguetes",
        imagen: "imagen/imagen",
        id: 1
    },
    {
        nombre: "huevo",
        precio: 1000,
        stock: 30,
        categoria: "juguetes",
        imagen: "imagen/imagen",
        id: 4
    },
    {
        nombre: "lubricante",
        precio: 10000,
        stock: 10,
        categoria: "cosmeticos",
        imagen: "imagen/imagen",
        id: 2
    },
    {
        nombre: "aceite de masaje",
        precio: 5000,
        stock: 40,
        categoria: "cosmeticos",
        imagen: "imagen/imagen",
        id: 5
    },
    {
        nombre: "baby doll",
        precio: 25000,
        stock: 20,
        categoria: "lenceria",
        imagen: "imagen/imagen",
        id: 3
    },
    {
        nombre: "transparente negro",
        precio: 35000,
        stock: 50,
        categoria: "lenceria",
        imagen: "imagen/imagen",
        id: 6
    }
]


// Ruta para obtener todos los productos
router.get('/api/products', (req, res) => {
    res.json({ products });
});

// Ruta para obtener un producto específico
router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid)

    // Ejemplo de búsqueda en un array de productos (reemplaza esta lógica con tu base de datos)
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
});

// Ruta para agregar un nuevo producto
router.post('/api/products', (req, res) => {

    const newProduct = req.body;

    // Validamos que se proporcionen todos los campos
    if (!newProduct.id ||
        !newProduct.name ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos (id, name, price, description, code, stock, category).' });
    }

    products.push(newProduct);

    res.json({ message: 'Producto agregado correctamente.' });

});

// Ruta para actualizar un producto por su ID (PUT /:pid)
router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    // Validamos que se proporcionen campos para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});

// Ruta para eliminar un producto por su ID (DELETE /:pid)
router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);


    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.json(deletedProduct[0]);
});


module.exports = router;