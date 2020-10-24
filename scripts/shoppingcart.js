// tQ: for populating page based on previous page, and to pass on to Gokay
// class product {
//     id
//     quantity
//     price
// }


// tQ: for form validation
class infofield {
    constructor(id) {
        this.id = id;
        this.obj = document.getElementById(id);
        this.txt = this.obj.innerHTML.trim().replace( /(<([^>]+)>)/ig, '');
        this.edit = this.obj.isContentEditable;
        this.valid = true;
    }
}

// tQ: t'is for Gokay
// class customer() {
//     firstName,
//     lastName,
//     addressLine1,
//     addressLine2,
//     addressLine3,
//     creditCardNo,
//     totalAmt
// }

function getInputs() {
    var fields = [
    "full-name",
    "email-address" ,     
    "address-line-1", // Mr. Chris Redfield
    "address-line-2", // 300 Unicorn Way
    "address-line-3", // Raccoon City, YK
    "address-line-4", // H0H0H0
    "cc-line-1", // 1234 5678 9361 2346
    "cc-line-2", // 12/21
    "cc-line-3", // 123

    "address-line-cc-1",
    "address-line-cc-2",
    "address-line-cc-3",
    "address-line-cc-4"
    ];

    var obj_array = [];

    for (i = 0; i < fields.length; ++i) {
        obj_array.push(new infofield(fields[i]));
    }

    return obj_array;
}

function toggleEditable(fields){

    var pencilIcon = document.getElementsByClassName("icon-pencil-container")[0];

    if (pencilIcon.classList.contains("icon-pencil-container-editmode")) {
        pencilIcon.classList.remove("icon-pencil-container-editmode");
    } else {
        pencilIcon.classList.add("icon-pencil-container-editmode");
        //greyOutButton();
    }

    fields.forEach(element => {
        var field = document.getElementById(element.id);
        if (field.isContentEditable) {
            field.classList.remove("order-summary-row-editmode");
            field.contentEditable = false;
        } else {
            field.classList.add("order-summary-row-editmode");
            field.contentEditable = true;
        }
    });
}

function toggleCCaddress() {
    var cbox = document.getElementById("useshipping");

    var fromArray = [
    "address-line-1", // Mr. Chris Redfield
    "address-line-2", // 300 Unicorn Way
    "address-line-3", // Raccoon City, YK
    "address-line-4" // H0H0H0
    ];

    var toArray = [
    "address-line-cc-1",  // Mr. Chris Redfield
    "address-line-cc-2",  // 300 Unicorn Way
    "address-line-cc-3",  // Raccoon City, YK
    "address-line-cc-4"  // H0H0H0
    ];

    if (cbox.checked) {
        document.getElementsByClassName("useShippingAddress-cc")[0].classList.remove("useShippingAddress-cc-invalid")
        document.getElementById("useThisAddress-cc").classList.add("useThisAddress-cc-hidden")
        for (i = 0; i < fromArray.length; ++i) {
            document.getElementById(toArray[i]).innerHTML = new infofield(fromArray[i]).txt;
        } 
    } else {
        document.getElementsByClassName("useShippingAddress-cc")[0].classList.add("useShippingAddress-cc-invalid")
        document.getElementById("useThisAddress-cc").classList.remove("useThisAddress-cc-hidden")
    }

    passToEditable = []; 
    for (i = 0; i < toArray.length; ++i) {
        passToEditable.push(new infofield(toArray[i]));
    }

    toggleEditable(passToEditable);
}

function validateInputs(obj_array) {

    document.getElementById("order-submit-button").classList.remove("disabled", "order-submit-button-disabled");

    var isOk = true;

    var placeholders = [
        "full name",
        "email address" ,     
        "address: full name", // Mr. Chris Redfield
        "address: street no. and name", // 300 Unicorn Way
        "address: city, province", // Raccoon City, YK
        "postal code (format: A1A1A1)", // H0H0H0
        "credit card number", // 1234 5678 9361 2346
        "credit card expiry date: mm/yy", // 12/21
        "3-digit credit card CCV", // 123
        
        "address: full name", // Mr. Chris Redfield
        "address: street no. and name", // 300 Unicorn Way
        "address: city, province", // Raccoon City, YK
        "postal code (format: A1A1A1)" // 123
    ]

    // tQ: check for input lengths
    for (i = 0; i < obj_array.length; ++i) {
        document.getElementById(obj_array[i].id).classList.remove("order-summary-row-invalid");
        if (obj_array[i].txt.length <= 1 || obj_array[i].txt=="Please enter your " + placeholders[i]) {
            obj_array[i].valid = false;
        }
    }

    // tQ: full name must be two words
    const regexp_fname = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/);
    if (!(regexp_fname.test(obj_array[0].txt.toLowerCase()))) {
        obj_array[0].valid = false;
    }
    
    // tQ: email must be valid
    const regexp_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regexp_email.test(String(obj_array[1].txt).toLowerCase()))) {
        obj_array[1].valid = false;
    }

    // tQ: postal code must match pattern
    const regexp_postal = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    var postal = [5,12];
    for (i = 0; i < postal.length; ++i) {
        if (!(regexp_postal.test(String(obj_array[postal[i]].txt)))) {
            obj_array[postal[i]].valid = false;
        }
    }

    // tQ: credit card number must match pattern
    const regexp_cc1 = /^[0-9]{16}$/;
    var testThis = String(obj_array[6].txt).replaceAll(" ","");
    if (!(regexp_cc1.test(String(obj_array[6].txt).replaceAll(" ","")))) {
        obj_array[6].valid = false;
    }
    // tQ: credit card exp date must be valid
    const regexp_cc2 = /^[0-9]{2}\/[0-9]{2}$/;
    obj_array[7].valid = false;
    if (regexp_cc2.test(String(obj_array[7].txt).replaceAll(" ",""))) {
        var month = parseInt(String(obj_array[7].txt).substring(0,2));
        var year = parseInt(String(obj_array[7].txt).substring(3));
        var compdate = new Date((2000 + year), month, 0);
        
        if (month >= 1 && month <= 12 && compdate >= new Date()) {
            obj_array[7].valid = true;
        }
    }
    // tQ: credit card ccv must match pattern
    const regexp_cc3 = /^[0-9]{3}$/;
    if (!(regexp_cc3.test(String(obj_array[8].txt).replaceAll(" ","")))) {
        obj_array[8].valid = false;
    }

    // tQ: append classes
    for (i = 0; i < obj_array.length; ++i) {
        if (!(obj_array[i].valid)) {
            document.getElementById(obj_array[i].id).innerHTML = "Please enter your " + placeholders[i];
            document.getElementById(obj_array[i].id).classList.add("order-summary-row-invalid");
            isOk = false;
        }
    }

    if (!(isOk)) {
        greyOutButton();
    }
}

function greyOutButton() {
    var submitButton = document.getElementById("order-submit-button");
    submitButton.classList.add("disabled", "order-submit-button-disabled");
}

// tQ: default behaviour
var allInputFields = document.getElementsByClassName("summary-form");
var checkThis = function() { validateInputs(getInputs()) };

for (i = 0; i < allInputFields.length; ++i) {
    allInputFields[i].addEventListener("blur", checkThis, false);
}

// document.getElementById("useshipping").checked = true;

// ----------------------------------- SHOPPING CART FUNCTIONALITY ---------------------------------------------------
let carts = document.querySelectorAll('.add-cart');
let products = [
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

// Add click listener to "add to cart" buttons
for(let i = 0; i < carts.length; i++){
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

    if(productPrice) {
        document.querySelector('#cart-meta p').textContent = productPrice;
        document.querySelector('#subtotal').textContent = productPrice;
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)
    }
}

// Add items to local storage
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    let productsPrice  = localStorage.getItem('totalCost');
    let floatPrice = parseFloat(productsPrice);
    let cartItems      = localStorage.getItem('productsInCart');

    productNumbers     = parseInt(productNumbers);
    // productsPrice      = parseFloat(productsPrice);
    cartItems          = JSON.parse(cartItems);

    if(action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1)
        localStorage.setItem('totalCost', (floatPrice - product.price).toFixed(2));

        productsPrice = localStorage.getItem('totalCost')
        floatPrice = parseFloat(productsPrice)

        document.querySelector('#cart-meta p').textContent = productsPrice
        document.querySelector("#subtotal").textContent = productsPrice;
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)

    } else if(action == "increase") {
        localStorage.setItem("cartNumbers", productNumbers + 1)
        localStorage.setItem('totalCost', (floatPrice + product.price).toFixed(2));

        productsPrice = localStorage.getItem('totalCost')
        floatPrice = parseFloat(productsPrice)

        document.querySelector('#cart-meta p').textContent = localStorage.getItem('totalCost')
        document.querySelector("#subtotal").textContent = localStorage.getItem('totalCost');
        document.querySelector('#shipping').textContent = (floatPrice / 10).toFixed(2);
        document.querySelector('#total').textContent = (floatPrice + (floatPrice / 10)).toFixed(2)

    } else if(productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(product);
}

// Sets the local storage item to be an object from the products array.
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems     = JSON.parse(cartItems)

    // If a cart item exists inside the cart, increment its "inCart" value by 1, otherwise set a new product and set its "inCart" value to 1.
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
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

    if(cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", (cartCost + product.price).toFixed(2))
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}

// Displays the items currently in the cart.
function displayCart() {
    let cartItems        = localStorage.getItem("productsInCart");
    let cartCost         = localStorage.getItem('totalCost')
    cartItems            = JSON.parse(cartItems);
    let productContainer = document.querySelector("#products");

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div id="product" class="cart-table-cell cart-table-pdt flex col-sm-8">
                <ion-icon style="cursor:pointer;color:#832d2d;" size="large" name="close-circle"></ion-icon>
                <img class="cart-row-img" src="images/cart/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="cart-table-cell cart-table-qty flex col-sm-2">              
                <a style="cursor:pointer;" class="button plusminus increase">+</a>              
                <span>${item.inCart}<span>               
                <a style="cursor:pointer;" class="button plusminus decrease">&#8211;</a>
            </div>
            <div class="cart-table-cell cart-table-prc flex col-sm-2">
                <span class="cart-cell-price">
                    $${(item.inCart * item.price).toFixed(2)}
                </span>
            </div>
            `
        });

        // productContainer.innerHTML += `
        //     <div class="basketTotalContainer">
        //         <h4 class="basketTotalTitle">
        //             Basket Total
        //         </h4>
        //         <h4 class="basket">
        //             ${cartCost}
        //         </h4>
        //     </div>
        // `
    }

    deleteButtons();
    manageQuantity();
}

// Deletes items from cart
function deleteButtons() {
    let deleteButtons  = document.querySelectorAll('#product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems      = localStorage.getItem('productsInCart');
    cartItems          = JSON.parse(cartItems);
    let cartCost       = localStorage.getItem('totalCost');
    let productName;

    for(let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

            localStorage.setItem('totalCost', (cartCost - (cartItems[productName].price * cartItems[productName].inCart)).toFixed(2))

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartPrice();
        });
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems       = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);

    for(let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.parentElement.textContent;
            currentProduct = decreaseButtons[i].parentElement.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

            if(cartItems[currentProduct].inCart > 1){
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    for(let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct], "increase");
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
          
        });
    }
}

onLoadCartPrice();
displayCart();