let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElem = document.getElementById('cart-count');
const cartTotalElem = document.getElementById('cart-total');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <p>${item.name}</p>
                <p>${item.price} Ft</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="decreaseItem(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseItem(${index})">+</button>
                <button onclick="removeItem(${index})">×</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartCountElem.textContent = itemCount;
    cartTotalElem.textContent = `Összesen: ${total} Ft`;
}

function increaseItem(index) {
    cart[index].quantity++;
    saveCart();
}

function decreaseItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// Termék hozzáadás
document.querySelectorAll('.termekek button').forEach((btn) => {
    btn.addEventListener('click', () => {
        const termek = btn.closest('.termekek');
        const name = termek.querySelector('h1').textContent;
        const priceText = termek.querySelector('.ar').textContent.replace(/\s/g,'').replace('Ft','').replace('$','');
        const price = parseInt(priceText);
        const img = termek.querySelector('img').src;

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({name, price, img, quantity:1});
        }
        saveCart();
    });
});

// Kosár nyitás / bezárás
cartIcon.addEventListener('click', () => {
    cartSidebar.style.right = '0';
});

closeCart.addEventListener('click', () => {
    cartSidebar.style.right = '-100%';
});


// Betöltéskor UI frissítés
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
