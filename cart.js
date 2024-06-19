import './style.css';
import { getCart,getProduct, setCart } from "./function";

function initialStart() {
    const cart = getCart();
    if (cart) {
        document.querySelector(".total-items").innerText = cart.items.length;
    }

}

function createRow(item) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>
                              <div class="flex items-center gap-3">
                                <div class="avatar">
                                  <div class="mask mask-squircle w-12 h-12">
                                    <img
                                      src="${item.thumbnail}"
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div class="font-bold">${item.title}</div>
                                </div>
                              </div>
                            </td>
                            <td>$${item.price}</td>
                            <td>
                              <input
                                type="number"
                                placeholder="Type here"
                                value="${item.quantity}"
                                class="quantity-input input input-bordered w-16 max-w-xs"
                              />
                            </td>
                            <td>$${item.price * item.quantity}</td>
    `
    const input= tr.querySelector(".quantity-input");
    input.addEventListener("input",(e)=>{
        const newQuantity = e.target.valueAsNumber;
        if(Number.isInteger(newQuantity) && newQuantity>=0){
            const cart=getCart();
            cart.items = cart.items.map((element)=>{
                if(item.id==element.id){
                    element.quantity=newQuantity;
                    return { ...element, quantity: newQuantity };
                }
                else return element;
            })
            setCart(cart);
            renderTotalCard()
            renderItems()
        }
    })
    return tr;
}

function renderItems() {
    const cartItemsDiv = document.querySelector(".rowItems");
    cartItemsDiv.innerHTML="";
    const cart = getCart();
    for(let i=0;i<cart.items.length;i++){
        const item = cart.items[i];
        cartItemsDiv.append(createRow(item));
    };

}

function totalCard(sum,discount,shipping,tax){
    const wholeCard= document.createElement("div");
    wholeCard.innerHTML=`  
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Sub total</span>
                    <span>$${sum}</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Shiping</span>
                    <span>$${shipping}</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Discount</span>
                    <span>$${discount}</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Tax</span>
                    <span>$${tax}</span>
                </div>
                <hr>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Totall</span>
                    <span>$${sum+shipping+discount+tax}</span>
                </div>
                <button class="w-20 btn btn-warning  mt-4 sm:w-auto">Procced to checkout</button>
    `
    return wholeCard;
}
async function renderTotalCard(){
    const sumCard= document.querySelector(".total-card")
    sumCard.innerHTML=""
    const cart =getCart();
    let sum =0,discount=0,tax=0;
    const shipping = cart.shipping
    for(let i=0;i<cart.items.length;i++){
        sum+=cart.items[i].price*cart.items[i].quantity;
    }
    const product = await  getProduct();
    for(let i=0;i<product.length;i++){
        for( let j=0;j<cart.items.length;j++){
            if(product[i].id==cart.items[j].id){
                discount+=product[i].discountPercentage*cart.items[j].quantity;
            }
        }
    }
    sumCard.append(totalCard(sum,discount,shipping,tax))
    
}

window.addEventListener("load", () => {
    initialStart();
    renderItems();
    renderTotalCard();
})


/*<div class="card-body">   
                <h2 class="card-title">Cart Totals</h2>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Sub total</span>
                    <span>$549</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Shiping</span>
                    <span>$549</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Discount</span>
                    <span>$0</span>
                </div>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Tax</span>
                    <span>$0</span>
                </div>
                <hr>
                <div class="flex flex-col sm:flex-row justify-between">
                    <span class="text-gray-500">Totall</span>
                    <span>$0</span>
                </div>
                <button class="w-20 btn btn-warning  mt-4 sm:w-auto">Procced to checkout</button>
              </div>
*/