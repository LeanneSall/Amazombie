class infofield {
    constructor(id) {
        this.id = id;
        this.obj = document.getElementById(id);
        this.txt = this.obj.innerHTML;
        this.edit = this.obj.isContentEditable;
        this.valid = true;
    }
}

function getFields() {
    var fields = [
    "full-name",
    "email-address" ,     
    "address-line-1", // Mr. Chris Redfield
    "address-line-2", // 300 Unicorn Way
    "address-line-3", // Raccoon City, YK
    "address-line-4", // H0H0H0
    "cc-line-1", // 1234 5678 9361 2346
    "cc-line-2", // 12/21
    "cc-line-3" // 123
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
    // tQ: validate
    validateInputs(getFields());
}

function validateInputs(obj_array) {
    var isOk = true;

    var placeholders = [
        "full name",
        "email address" ,     
        "address line 1: full name", // Mr. Chris Redfield
        "address line 2: street no. and name", // 300 Unicorn Way
        "address line 3: city, province", // Raccoon City, YK
        "address line 4: postal code (format: A1A1A1)", // H0H0H0
        "credit card number", // 1234 5678 9361 2346
        "credit card expiry date: mm/yy", // 12/21
        "credit card CVN" // 123
    ]

    // tQ: check for input lengths
    for (i = 0; i < obj_array.length; ++i) {
        document.getElementById(obj_array[i].id).classList.remove("order-summary-row-invalid");
        if (obj_array[i].txt.trim().length <= 1) {
            obj_array[i].valid = false;
        }
    }

    // tQ: full name must be two words
    const regexp_fname = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/i);
    if (!(regexp_fname.test(obj_array[0].txt))) {
        obj_array[0].valid = false;
    }
    
    // tQ: email must be valid
    const regexp_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regexp_email.test(String(obj_array[1].txt).toLowerCase()))) {
        obj_array[1].valid = false;
    }

    // tQ: postal code must match pattern
    const regexp_postal = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/;
    if (!(regexp_postal.test(String(obj_array[5].txt).toLowerCase()))) {
        obj_array[5].valid = false;
    }

    // tQ: credit card must match pattern
    

    for (i = 0; i < obj_array.length; ++i) {
        if (!(obj_array[i].valid)) {
            document.getElementById(obj_array[i].id).innerHTML = "Please enter your " + placeholders[i];
            document.getElementById(obj_array[i].id).classList.add("order-summary-row-invalid");
            isOk = false;
        }
    }

    // if (isOk) {

    // } else {

    // }
}

// class customer {
//     firstName,
//     lastName,
//     addressLine1,
//     addressLine2,
//     addressLine3,
//     creditCardNo,
//     totalAmt
// }