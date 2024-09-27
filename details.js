const apiURL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2ODAzNjc5YzQ1ZjAwMTU2OWI1NWYiLCJpYXQiOjE3Mjc0MzA3MTAsImV4cCI6MTcyODY0MDMxMH0.y4a5catl6ugkCFb020Ha27P3d2prUW1iWkwmBAcVG7o";
const productId = new URLSearchParams(window.location.search).get('productId');

const productName = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const productBrand = document.getElementById('product-brand');
const productPrice = document.getElementById('product-price');
const productImage = document.getElementById('product-image');

const loadProductDetails = async (id) => {
    try {
        const response = await fetch(`${apiURL}${id}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Errore nel recupero del prodotto');
        }

        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error(error);
        alert('Errore nel caricamento dei dettagli del prodotto: ' + error.message);
    }
};

const displayProductDetails = (product) => {
    productName.innerText = product.name;
    productDescription.innerText = product.description;
    productBrand.innerText = `Marca: ${product.brand}`;
    productPrice.innerText = `Prezzo: €${product.price}`;
    productImage.src = product.imageUrl;
};

const deleteProduct = async () => {
    try {
        const response = await fetch(`${apiURL}${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Errore nell\'eliminazione del prodotto');
        }

        alert('Prodotto eliminato con successo!');
        window.location.href = './index.html';
    } catch (error) {
        console.error(error);
        alert('Errore nell\'eliminazione del prodotto: ' + error.message);
    }
};

console.log(productId);
loadProductDetails(productId);
