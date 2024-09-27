const productsRow = document.getElementById('products-row');
const apiURL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2ODAzNjc5YzQ1ZjAwMTU2OWI1NWYiLCJpYXQiOjE3Mjc0MzA3MTAsImV4cCI6MTcyODY0MDMxMH0.y4a5catl6ugkCFb020Ha27P3d2prUW1iWkwmBAcVG7o";


const fetchProducts = async () => {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2ODAzNjc5YzQ1ZjAwMTU2OWI1NWYiLCJpYXQiOjE3Mjc0MzA3MTAsImV4cCI6MTcyODY0MDMxMH0.y4a5catl6ugkCFb020Ha27P3d2prUW1iWkwmBAcVG7o"
            }
        });

        if (!response.ok) {
            throw new Error('Errore nel recupero dei prodotti');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error(error);
        alert('Errore nel recupero dei prodotti: ' + error.message);
    }
};


const displayProducts = (products) => {
    productsRow.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Marca: ${product.brand}</p>
                        <p class="card-text">Prezzo: €${product.price}</p>
                        <a href="./details.html?productId=${product._id}" class="btn btn-secondary">Dettagli</a>
                        <button class="btn btn-success" onclick="redirectToEdit('${product._id}')">Modifica</button>
                        <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Elimina</button>
                    </div>
                </div>
            </div>
        `;
        productsRow.innerHTML += productCard;
    });
};


const redirectToEdit = (productId) => {
    window.location.href = `./backoffice.html?productId=${productId}`;
};


const deleteProduct = async (productId) => {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
        try {
            const response = await fetch(`${apiURL}${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2ODAzNjc5YzQ1ZjAwMTU2OWI1NWYiLCJpYXQiOjE3Mjc0MzA3MTAsImV4cCI6MTcyODY0MDMxMH0.y4a5catl6ugkCFb020Ha27P3d2prUW1iWkwmBAcVG7o"
                }
            });

            if (!response.ok) {
                throw new Error('Errore nella cancellazione del prodotto');
            }

            alert('Prodotto eliminato con successo');
            fetchProducts();
        } catch (error) {
            console.error(error);
            alert('Errore nella cancellazione del prodotto: ' + error.message);
        }
    }
};


fetchProducts();
