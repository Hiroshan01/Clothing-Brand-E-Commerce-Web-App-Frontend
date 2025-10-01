export function getCart() {
    let cart = localStorage.getItem("cart")

    if (cart == null) {
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
    } else {
        cart = JSON.parse(cart) // convert string to array
    }
    return cart
}

export function addCart(product, qty) {
    let cart = getCart()

    let index = cart.findIndex((item) => {
        return item.productId == product.productId
    }) //now available product

    //If not product in cart
    if (index == -1) {
        cart[cart.length] = {
            productId: product.productId,
            name: product.ProductName,
            image: product.images[0],
            price: product.price,
            labellPrice: product.labellPrice,
            qty: qty
        }
    } else {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(product.productId)
            return;
        } else {
            cart[index].qty = newQty;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
    let cart = getCart();

    let newCart = cart.filter((item) => {
        return item.productId != productId
    })
    localStorage.setItem("cart", JSON.stringify(newCart));
}

//total

export function getTotal() {
    let cart = getCart();

    let total = 0

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total
}