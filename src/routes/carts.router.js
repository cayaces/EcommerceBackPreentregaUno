const express = require("express");
const router = express.Router();

const carts =[]

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

router.post('/api/carts', (req, res) => {
    const cartId = carts.length + 1; 
    const cart = {
        id: cartId,
        products: []
    };

    for (let i = 0; i < 3; i++) {
        const randomProductIndex = Math.floor(Math.random() * products.length);
        const randomQuantity = Math.floor(Math.random() * 5) + 1; 
        const productToAdd = { ...products[randomProductIndex], quantity: randomQuantity };
        cart.products.push(productToAdd);
    }

    carts.push(cart);

    res.json({ message: 'Carrito creado exitosamente', cart });
});


router.get('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    res.json(cart);
});

router.post('/api/carts/:cid/products', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const product = products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    const cartProduct = { ...product, quantity };
    cart.products.push(cartProduct);

    res.json({ message: 'Producto agregado al carrito', cartProduct });
});



module.exports = router;