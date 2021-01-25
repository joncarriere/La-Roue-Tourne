// carousel
const carouselIntroduction = document.getElementById('carouselExampleIndicators');
let carouselText = document.querySelectorAll('.carouselText');
let carouselButton = document.querySelectorAll('.carouselButton');

function setCarouselItemVisibility(show) {
    for (let i = 0; i < carouselText.length; i++) {
        carouselText[i].style.display = show;
    }

    for (let i = 0; i < carouselButton.length; i++) {
        carouselButton[i].style.display = show;
    }
}

carouselIntroduction.addEventListener('mouseenter', () => {
    setCarouselItemVisibility('block');
});

carouselIntroduction.addEventListener('mouseleave', () => {
    setCarouselItemVisibility('none');

});

// focus catégorie
let categoryList = document.getElementsByClassName('bikeCategory'); // liste des catégories
let categoryLinkList = document.getElementsByClassName('categoryLink'); // liste des liens-catégorie
for (const element of categoryLinkList) {
    element.addEventListener('click', showCategory)
}

function showCategory() {
    let home = document.getElementById('home');
    home.style.display = 'none'; // disparition de la home
    let categoryPosition = this.href.indexOf('#') + 1; // récupération de la position du caractère après le # dans le lien qui a déclenché la fonction
    let category = this.href.substring(categoryPosition); // récupération de la chaine de caractère après le # (= nom de la catégorie)
    for (const element of categoryList) {
        if (element.id == category) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    };

}

// FLECHE TOP
let arrowTop = document.getElementById('arrowTop');
function scrollTopPage() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
};

window.onscroll = function () {
    arrowTopDisplay()
}
function arrowTopDisplay() {
    if (document.body.scrollTop > (window.innerHeight * 1.5) || document.documentElement.scrollTop > (window.innerHeight * 1.5)) {
        arrowTop.style.display = 'inline-block';
    } else {
        arrowTop.style.display = 'none';
    }
}

//panier
// les articles dans le panier sont sous la forme NOM_REF_NB_PRIX
let products = [];

// ajouter au panier
function addToCart(btn) {
    let item = btn.parentElement.parentElement.getElementsByTagName('h2')[0].textContent; //on récupère le nom de l'article
    let reference = btn.parentElement.parentElement.getElementsByClassName('reference')[0].textContent; //récupération de la ref article
    let price = btn.parentElement.getElementsByClassName('price')[0].getAttribute('data-price'); // récupération du prix de l'article
    let productInCart = false;

    // vérifie si le produit est déjà dans le panier
    for (let i = 0; i < products.length; i++) {
        if (products[i].split('_')[1] === reference) {
            productInCart = true; // le produit est dans le panier
            let splitted = products[i].split('_'); // découpe et stock chaque élément du produit (nom, ref, nb, prix)
            products[i] = splitted[0] + '_' + splitted[1] + '_' + (parseFloat(splitted[2]) + 1) + '_' + splitted[3];
        }
    }

    // si le produit n'est pas dans le panier, l'ajouter
    if (productInCart === false) {
        products.push(item + '_' + reference + '_' + '1' + '_' + price);
    }

    updateCart();
}

// Met à jour la modal du panier
function updateCart() {
    let cartContent = document.getElementById('cartContent'); // ciblage du contenu de la modal
    cartContent.innerHTML = '';
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
        let splitted = products[i].split('_'); 
        totalPrice += splitted[2] * splitted[3]; //Ajout du prix des articles fois la quantité, dans le total 
        cartContent.innerHTML += splitted[0] + ' : ' + splitted[1] + '<button data-ref="' + splitted[1] + '" onclick="addItem(this, -1)" class="btn">-</button><p class="itemQuantity">' + splitted[2] + '</p><button data-ref="' + splitted[1] + '" onclick="addItem(this, 1)" class="btn">+</button><p>' + (splitted[2] * splitted[3]).toFixed(2) + '€'; // création de la ligne produit dans la modal (nom, ref, boutons, quantité, prix)
    }
    cartContent.innerHTML += '<p>Total : ' + totalPrice.toFixed(2) + '€</p>';
}

// boutons + et -
function addItem(btn, amount) {
    let reference = btn.getAttribute('data-ref');

    for (let i = 0; i < products.length; i++) {
        if (products[i].split('_')[1] === reference) {
            let splitted = products[i].split('_');
            products[i] = splitted[0] + '_' + splitted[1] + '_' + (parseFloat(splitted[2]) + amount) + '_' + splitted[3];
        }
    }

    updateCart();
}