// ICON + HAMBURGER
const nav = document.querySelector('nav');

document.getElementById('icon').addEventListener('click', (e) => {
    (e.target.classList);

    if(e.target.classList.contains('active')){
        e.target.classList.remove('active');
        nav.classList.remove('active');
    }else{
        e.target.classList.add('active');
        nav.classList.add('active');
    }
});

// INIT COUNTDOWN
function handleTickInit(tick) {
    Tick.count.down('2020' + '-12-1').onupdate = function(value) {
        tick.value = value;
    };
}


// Hides cards as soon as screen width hits 767px
function myFunction(x) {
    if (x.matches) { // If media query matches
        $(".tier-description").hide();
    } else {
        $(".tier-description").show();
    }
}

var x = window.matchMedia("(max-width: 767px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes

// Toggles cards
$(".more").on("click", function () {
    var clicked = this.id;
    var hidden = $(`#desc${clicked}`);

    hidden.slideToggle();
})

// ----------------------------------- SHOPPING CART FUNCTIONALITY ---------------------------------------------------
let carts = document.querySelectorAll('.add-cart');
let products;
$(document).ready(function () {
    if (document.getElementById("tier-c")) {
        products = [
            {
                name: 'Tier C',
                tag: 'tierc',
                price: 499.99,
                inCart: 0
            }
        ];
    } else if (document.getElementById("tier-b")) {
        products = [
            {
                name: 'Tier B',
                tag: 'tierb',
                price: 1999.99,
                inCart: 0
            }
        ];
    } else if (document.getElementById("tier-a")) {
        products = [
            {
                name: 'Tier A',
                tag: 'tiera',
                price: 4999.99,
                inCart: 0
            }
        ];
    } else {
        products = [
            {
                name: 'Tier A',
                tag: 'tiera',
                price: 4999.99,
                inCart: 0
            },
            {
                name: 'Tier B',
                tag: 'tierb',
                price: 1999.99,
                inCart: 0
            },
            {
                name: 'Tier C',
                tag: 'tierc',
                price: 499.99,
                inCart: 0
            }
        ];
    }
});

// Add click listener to "add to cart" buttons
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i]);
        let productsPrice = localStorage.getItem('totalCost');
        let floatPrice = parseFloat(productsPrice);

        document.querySelector('#cart-meta p').textContent = productsPrice;
        document.querySelector('#subtotal').textContent = productsPrice;
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)

    })
}

// Assigns the number of cart items to the cart icon every time the page is loaded.
function onLoadCartPrice() {
    let productPrice = localStorage.getItem('totalCost');
    let floatPrice = parseFloat(productPrice);

    if (productPrice) {
        document.querySelector('#cart-meta p').textContent = productPrice;
        document.querySelector('#subtotal').textContent = productPrice;
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)
    }
}

// Add items to local storage
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    let productsPrice = localStorage.getItem('totalCost');
    let floatPrice = parseFloat(productsPrice);
    let cartItems = localStorage.getItem('productsInCart');

    productNumbers = parseInt(productNumbers);
    // productsPrice      = parseFloat(productsPrice);
    cartItems = JSON.parse(cartItems);

    if (action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1)
        localStorage.setItem('totalCost', (floatPrice - product.price).toFixed(2));

        productsPrice = localStorage.getItem('totalCost')
        floatPrice = parseFloat(productsPrice)

        document.querySelector('#cart-meta p').textContent = productsPrice
        document.querySelector("#subtotal").textContent = productsPrice;
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)

    } else if (action == "increase") {
        localStorage.setItem("cartNumbers", productNumbers + 1)
        localStorage.setItem('totalCost', (floatPrice + product.price).toFixed(2));

        productsPrice = localStorage.getItem('totalCost')
        floatPrice = parseFloat(productsPrice)

        document.querySelector('#cart-meta p').textContent = localStorage.getItem('totalCost')
        document.querySelector("#subtotal").textContent = localStorage.getItem('totalCost');
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)

    } else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(product);
}

// Sets the local storage item to be an object from the products array.
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    // If a cart item exists inside the cart, increment its "inCart" value by 1, otherwise set a new product and set its "inCart" value to 1.
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost')

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", (cartCost + product.price).toFixed(2))
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}

// Displays the items currently in the cart.
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost = localStorage.getItem('totalCost')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector("#products");

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div id="product" class="cart-table-cell cart-table-pdt flex col-sm-8">
                <ion-icon style="cursor:pointer;color:#832d2d;" size="large" name="close-circle"></ion-icon>
                <img class="cart-row-img" src="images/cart/${item.tag}.png">
                <span style="font-weight:bold;">${item.name}</span><p>:&nbsp;${item.title}</p>
            </div>
            <div class="cart-table-cell cart-table-qty flex col-sm-2">              
                <a style="cursor:pointer;" class="button plusminus increase">+</a>              
                <span>${item.inCart}</span>               
                <a style="cursor:pointer;" class="button plusminus decrease">&#8211;</a>
            </div>
            <div class="cart-table-cell cart-table-prc flex col-sm-2">
                <span class="cart-cell-ccy">
                  $
                </span>
                <span class="cart-cell-price">
                    ${(item.inCart * item.price).toFixed(2)}
                </span>
            </div>
            `
        });
    }

    deleteButtons();
    manageQuantity();
}

// Deletes items from cart
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('#product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    let productName;

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '').substring(0, 5);

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

            localStorage.setItem('totalCost', (cartCost - (cartItems[productName].price * cartItems[productName].inCart)).toFixed(2))

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            // tQ: display message when qty is 0
            if (localStorage.getItem('cartNumbers') == 0) {
                zombiesAreComing();
            }

            displayCart();
            onLoadCartPrice();
        });
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim().substring(0, 5);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct], "increase");
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();

        });
    }
}

onLoadCartPrice();
displayCart();
