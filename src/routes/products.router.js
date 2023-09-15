const express = require('express');
const router = express.Router();

const products = [
    {
        nombre: "snapy",
        precio: 25000,
        stock: 50,
        categoria: "juguetes",
        codigo: "abc1",
        id: 1
    },
    {
        nombre: "huevo",
        precio: 1000,
        stock: 30,
        categoria: "juguetes",
        codigo: "abc2",
        id: 2
    },
    {
        nombre: "lubricante",
        precio: 10000,
        stock: 10,
        categoria: "cosmeticos",
        codigo: "abc3",
        id: 3
    },
    {
        nombre: "aceite de masaje",
        precio: 5000,
        stock: 40,
        categoria: "cosmeticos",
        codigo: "abc4",
        id: 4
    },
    {
        nombre: "baby doll",
        precio: 25000,
        stock: 20,
        categoria: "lenceria",
        codigo: "abc5",
        id: 5
    },
    {
        nombre: "transparente negro",
        precio: 35000,
        stock: 50,
        categoria: "lenceria",
        codigo: "abc6",
        id: 6
    }
]

router.get('/api/products', (req, res) => {
    res.json({ products });
});

router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid)

    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
});

router.post('/api/products', (req, res) => {

    const newProduct = req.body;

    if (!newProduct.id ||
        !newProduct.nombre ||
        !newProduct.precio ||
        !newProduct.descripcion ||
        !newProduct.codigo ||
        !newProduct.stock ||
        !newProduct.categoria) {
        res.json({ mesagge: "Producto agregado" })
    } else {

        return res.status(400).json({ message: 'Debe llenar todos los campos' });
    }

    products.push(newProduct);

});

router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'Tienes que completar al menos un campo' });
    }

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});


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