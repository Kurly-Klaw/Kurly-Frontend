// cart.js
export function getCart() {
    const listCart = sessionStorage.getItem("carrinho");
    return JSON.parse(listCart);
}

export function updateCart(carrinho) {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}