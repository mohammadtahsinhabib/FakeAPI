const load_all_product = () => fetch('https://fakestoreapi.com/products')
    .then(res => res.json()).then(
        products => display_product(products));

const display_product = (products) => {

    const product_container = document.getElementsByClassName("product-container")[0];
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        div.innerHTML = `
        <img class="card-img" src="${product.image}" alt="" />
        <h5>${product.title}</h5>
        <h3>price: ${product.price}</h3>
        <p>${product.description.slice(0, 50)}</p>
        <button onclick="singleProduct(${product.id})">Details</button>
        <button onclick="handleAddToCart('${product.title.slice(0, 12)}',${product.price
            })">Add TO CArt</button>`;

        product_container.appendChild(div);

    });
}

let Serial = 1;
const handleAddToCart = (title, price) => {
    const cart = document.getElementsByClassName("card")[0];
    const div = document.createElement("div");
    div.classList.add("cart-box");
    div.innerHTML = `<p>${Serial++} </p><p>${title}</p><p class="price">${price}</p> `;
    cart.appendChild(div);
    UpdateTotal();

};

const UpdateTotal = () => {
    const allPrice = document.getElementsByClassName("price");
    let count = 0;
    for (const element of allPrice) {
        count = count + parseFloat(element.innerText);
    }
    document.getElementById("total").innerText = count.toFixed(2);
};

const singleProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
            document.getElementById("modal-img").src = product.image;
            document.getElementById("modal-title").innerText = product.title;
            document.getElementById("modal-price").innerText = "Price: $" + product.price;
            document.getElementById("modal-description").innerText = product.description;


            const myModal = new bootstrap.Modal(document.getElementById('productModal'));
            myModal.show();
        });
};

load_all_product();