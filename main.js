import './style.css';
import { getProduct,getCart,setCart,initialStart } from './function';


async function renderCard() {
    const products = await getProduct();
    const cardDiv = document.querySelector(".product-container");


    products.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure>
                <img src="${element.thumbnail}" alt="${element.title}" />
            </figure>
            <div class="absolute top-0 right-0 bg-primary text-white w-14 h-14 flex items-center justify-center text-center font-semibold rounded-tr-2xl rounded-bl-2xl">
                ${element.discountPercentage}% Off
            </div>
            <div class="card-body">
                <h2 class="card-title">${element.title}</h2>
                <p>${element.description}</p>
                <p>$${element.price}</p>
            </div>
        </div>
        `;

        const buttonDiv = document.createElement("div");
        buttonDiv.classList = "card-actions justify-end";
        const button = document.createElement("button");
        button.innerText = "Add to cart";
        button.classList.add("btn", "btn-sm", "btn-primary");
        buttonDiv.append(button);
        

        button.addEventListener("click", () => {
            const cart = getCart();
            const wasAdded = cart.items.find((item) => item.id === element.id);
            if (!wasAdded) {
                cart.items.push({
                    id: element.id,
                    title: element.title,
                    description: element.description,
                    thumbnail: element.thumbnail,
                    price: element.price,
                    quantity: 1,
                });
            }
            else {
                cart.items = cart.items.map(item => {
                    if (item.id === element.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }
                    return item;
                });
            }
            document.querySelector(".total-items").innerText = cart.items.length;
            setCart(cart);
        });


        div.querySelector(".card-body").appendChild(buttonDiv);
        cardDiv.append(div);
    });
}

window.addEventListener("load",()=>{
    initialStart();
    renderCard();
})

