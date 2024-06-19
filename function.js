import './style.css';

export async function getProduct() {
    const fetchData = await fetch('https://dummyjson.com/products?limit=100');
    const mainData = await fetchData.json();
    return mainData.products;
}
export function getCart() {
    const value = localStorage.getItem("cart");
    const cart = JSON.parse(value);
    return cart;
}

export function setCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}
export function initialStart(){
    const cart=getCart();
        if (!cart) {
            const cart = {
                items: [],
                discount: 0,
                shipping: 100,
            };
            setCart(cart);
        } else {
            getCart();
            document.querySelector(".total-items").innerText = cart.items.length;
        }
}