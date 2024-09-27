const backpacksURL = 'https://striveschool-api.herokuapp.com/api/product/';
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get('productId');
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2ODAzNjc5YzQ1ZjAwMTU2OWI1NWYiLCJpYXQiOjE3Mjc0MzA3MTAsImV4cCI6MTcyODY0MDMxMH0.y4a5catl6ugkCFb020Ha27P3d2prUW1iWkwmBAcVG7o";


function updateButtonText(isEditing) {
    const buttonText = isEditing ? 'Modifica Prodotto' : 'Crea Prodotto';
    document.getElementById('submit-button').innerText = buttonText;
}


if (productId) {
    fetch(backpacksURL + productId, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Errore nel recupero del prodotto');
            }
        })
        .then(singleProduct => {
            document.getElementById('name').value = singleProduct.name;
            document.getElementById('description').value = singleProduct.description;
            document.getElementById('brand').value = singleProduct.brand;
            document.getElementById('imageUrl').value = singleProduct.imageUrl;
            document.getElementById('price').value = singleProduct.price;

            updateButtonText(true);
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Errore nel recupero del prodotto: ' + error.message);
        });
} else {
    updateButtonText(false);
}


class Product {
    constructor(name, description, brand, imageUrl, price) {
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}


const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', function (e) {
    e.preventDefault();


    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const price = document.getElementById('price').value;


    const product = new Product(name, description, brand, imageUrl, price);


    const methodToUse = productId ? 'PUT' : 'POST';
    const urlToUse = productId ? backpacksURL + productId : backpacksURL;


    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            if (response.ok) {
                alert(productId ? 'Prodotto modificato con successo!' : 'Prodotto creato con successo!');
                productForm.reset();
                updateButtonText(false);
            } else {
                throw new Error('Errore nel salvataggio del prodotto');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Errore nel salvataggio del prodotto: ' + error.message);
        });
});


const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function () {
    productForm.reset();
    updateButtonText(false);
});
