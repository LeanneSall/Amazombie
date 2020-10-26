$('document').ready(function(){
    displayOrder()
})

// Get the divs
var orderNoDiv = document.querySelector('#order-no')
var nameDiv = document.querySelector('#customer-name')
var orderDateDiv = document.querySelector('#order-date')
var address1Div = document.querySelector('#address-line-1')
var address2Div = document.querySelector('#address-line-2')
var address3Div = document.querySelector('#address-line-3')
var emailDiv = document.querySelector('#customer-email')
var paymentMethodDiv = document.querySelector('#payment-method')
var subtotalDiv = document.querySelector('#subtotal')
var taxesDiv = document.querySelector('#taxes')
var shippingDiv = document.querySelector('#shipping')
var totalDiv = document.querySelector('#total')

var itemsDiv = document.querySelector('#purchased-items')

// Display items and customer information
function displayOrder() {

    // Parse localStorage item
    var actuallyInCart = JSON.parse(localStorage.getItem("productsInCart"));
    var customerInfoJson = JSON.parse(localStorage.getItem("customer"))
    var totalCostJson = JSON.parse(localStorage.getItem('totalCost'))
    
    // Converts numbers to strings
    var strSubtotal = '$' + totalCostJson.toString()
    var strShip = '$' + ((totalCostJson * 0.1).toFixed(2)).toString()
    var strTotal = '$' + ((totalCostJson  * 1.1).toFixed(2)).toString()
    
    // Inserts the the customer info into corresponding div
    orderNoDiv.innerHTML = generateRandomNo()
    nameDiv.innerHTML = customerInfoJson.firstName + ' ' + customerInfoJson.lastName
    orderDateDiv.innerHTML = getCurrentDate()
    address1Div.innerHTML = customerInfoJson.addressLine1
    address2Div.innerHTML = customerInfoJson.addressLine2
    address3Div.innerHTML = customerInfoJson.addressLine3
    //emailDiv.innerHTML = customerInfoJson.email
    paymentMethodDiv.innerHTML = maskCardNo(customerInfoJson.creditCardNo) + '<i class="fab fa-cc-visa"></i>'
    subtotalDiv.innerHTML = strSubtotal
    taxesDiv.innerHTML = 'Over My Cold Undead Body'
    shippingDiv.innerHTML = strShip
    totalDiv.innerHTML = strTotal
    itemsDiv = displayItems(actuallyInCart)
    document.querySelector('#cart-meta p').textContent = '0';
    
    removeFromLocalStorage('productsInCart')
    removeFromLocalStorage('customer')
    removeFromLocalStorage('totalCost') 
}

// Get current date
function getCurrentDate() {
    let date = new Date()
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
}

// Mask the credit card no
function maskCardNo(cardNo){
    var masked = '************' + cardNo.substr(-4)
    return masked
}

// generate random no for the order #
function generateRandomNo() {
    return Math.floor(10000000 + Math.random() * 9000000)
}

// Iterate through cart items to display
function displayItems(obj) {
    Object.values(obj).forEach(item => {
        
        var node = document.createElement('div')
        node.setAttribute('class', 'display-items flex col-sm-12')
        node.innerHTML = `
                        <div class="col-sm-3 item-image-con">
                            <img class="cart-row-img" src="../images/cart/${item.tag}.png" style="width: 100%;">
                        </div>
                        <div class="col-sm-3">
                            <p>${item.name}</p>    
                        </div>
                        <div class="col-sm-3 item-quantity">
                            <p class="cart-qty">${item.inCart}</p>
                        </div>
                        <div class="col-sm-3 item-detail-con">
                            <p>$${(item.price * item.inCart).toFixed(2)}</p>                            
                        </div>`
        
        itemsDiv.appendChild(node);
    })
}


//Remove item from localStorage
function removeFromLocalStorage(item) {
    localStorage.removeItem(item)
}


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