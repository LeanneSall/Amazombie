//const { disconnect } = require("process")

// Get the divs
const orderNoDiv = document.querySelector('#order-no')
const nameDiv = document.querySelector('#customer-name')
const orderDateDiv = document.querySelector('#order-date')
const address1Div = document.querySelector('#address-line-1')
const address2Div = document.querySelector('#address-line-2')
const address3Div = document.querySelector('#address-line-3')
const emailDiv = document.querySelector('#customer-email')
const paymentMethodDiv = document.querySelector('#payment-method')
const subtotalDiv = document.querySelector('#subtotal')
const taxesDiv = document.querySelector('#taxes')
const shippingDiv = document.querySelector('#shipping')
const totalDiv = document.querySelector('#total')

const itemsDiv = document.querySelector('#purchased-items')

// Some dummy data. to be erased
var customerInfo = {
    name: 'Chris Redfield',
    address1: '300 Unicorn Way',
    address2: 'Racoon, YK',
    address3: 'Neverland',
    email: 'email@email.com',
    paymentMethod: '123456789239'
} 
var inCart = [
    box1 = {
        image: 'images/cart/crate.png',
        description: 'Get Those Zombies Off My Lawn (Tier 1)',
        quantity: 2,
        price: 69,
    },
    box2 = {
        image: 'images/cart/crate.png',
        description: 'Get Those Zombies Off My Lawn (Tier 1)',
        quantity: 2,
        price: 69,
    },
    // box3 = {
    //     price: 123
    // },
]


function displayOrder() {
    // #1. Update localstorage with the CURRENT instance of our cart array
    // also need to JSON.stringify because localstorage only works with JSON
    
    // cretas a localstorage item with a name 'inTheCart'
    localStorage.setItem("inTheCart", JSON.stringify(inCart));
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

    // #2. Retrieve the cart data from local storage and then parse the JSON data into javascript objects
    // Then assign a variable to the cart data.
    var actuallyInCart = JSON.parse(localStorage.getItem("inTheCart"));
    var customerInfoJson = JSON.parse(localStorage.getItem("customerInfo"))
    console.log(actuallyInCart);
    console.log(customerInfoJson)
    
    
    var subtotal = 0;
    
    actuallyInCart.forEach((item) => {
        subtotal += item.price
    });
    
    var strSubtotal = '$' + subtotal.toString()
    var strTaxes = '$' + ((subtotal * 0.12).toFixed(2)).toString()
    var strShip = '$' + (20).toString()
    var strTotal = '$' + (subtotal + (subtotal * 0.12) + 20).toString()
    
    orderNoDiv.innerHTML = generateRandomNo()
    nameDiv.innerHTML = customerInfoJson.name
    orderDateDiv.innerHTML = getCurrentDate()
    address1Div.innerHTML = customerInfoJson.address1
    address2Div.innerHTML = customerInfoJson.address2
    address3Div.innerHTML = customerInfoJson.address3
    emailDiv.innerHTML = customerInfoJson.email
    paymentMethodDiv.innerHTML = maskCardNo(customerInfoJson.paymentMethod) + '<i class="fab fa-cc-visa"></i>'
    subtotalDiv.innerHTML = strSubtotal
    taxesDiv.innerHTML = strTaxes
    shippingDiv.innerHTML = strShip
    totalDiv.innerHTML = strTotal

    itemsDiv = displayItems(actuallyInCart)

}

function getCurrentDate() {
    let date = new Date()
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

function maskCardNo(cardNo){
    var masked = '************' + cardNo.substr(-4)
    return masked
}

function generateRandomNo() {
    return Math.floor(10000000 + Math.random() * 9000000)
}

function displayItems(object) {
    object.forEach(item => {
        var node = document.createElement('div')
        node.setAttribute('class', 'flex col-sm-12')
        node.innerHTML = `<div class="flex col-sm-8">
                            <img class="cart-row-img" src="${item.image}">
                            <div class="">
                                <p>${item.description}</p>    
                            </div>
                        </div>
                        <div class="col-sm-2"><!--qty-->
                            <p class="cart-qty">${item.quantity}</p>
                        </div>
                        <div class="col-sm-2">
                            <p>$${item.price}</p>                            
                        </div>`
        
        itemsDiv.appendChild(node);
    })
}
