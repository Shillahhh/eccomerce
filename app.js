// Function to increase quantity
function increaseQuantity() {
    var quantityElement = document.getElementById('quantity');
    var quantity = parseInt(quantityElement.innerText);
    quantityElement.innerText = quantity + 1;
    // Update total quantity in navbar
    updateTotalQuantity();
}
updateTotalQuantity();


// Function to decrease quantity
function decreaseQuantity() {
    var quantityElement = document.getElementById('quantity');
    var quantity = parseInt(quantityElement.innerText);
    if (quantity > 1) {
        quantityElement.innerText = quantity - 1;
        // Update total quantity in navbar
        updateTotalQuantity();
    }
}


// Function to update total quantity in navbar
function updateTotalQuantity() {
    var cart = localStorage.getItem('cart');
    var totalQuantityElement = document.querySelector('.total-quantity');
    // Check if cart data and total quantity element exist
    if (cart && totalQuantityElement) {
        // Parse the cart items from JSON string to JavaScript array 
        var cartItems = JSON.parse(cart);
         // Initialize total quantity counter
        var totalQuantity = 0;
        // Loop through each item in the cart
        cartItems.forEach(function(item) {
            totalQuantity += parseInt(item.quantity);
        });
        totalQuantityElement.innerText = totalQuantity;
    }
}



// Function to add to cart.
function addToCart(itemName, itemPrice, selectedSize, quantity, imageURL) {
    // Check if size is selected
    var selectedOption = document.getElementById('selectedOption').innerText;
    var quantity = parseInt(document.getElementById('quantity').innerText);

    if (!selectedOption) {
        alert('Please select a size before adding to cart.');
        return;
    } 
   console.log("Adding to cart:", itemName, itemPrice, selectedSize, quantity);

   // Check if item already exists in cart
   var existingItem = findItemInCart(itemName, selectedSize);
   if (existingItem) {
       // Shows alert that the item is already in the cart
       alert('Item already in cart!');
       return;
   }

   // Creating an object to store item details
   var newItem = {
       name: itemName,
       price: itemPrice,
       size: selectedOption,
       quantity: quantity,
       imageURL: imageURL 
   };

   // Check if cart exists in localStorage
   var cart = localStorage.getItem('cart');
   if (cart) {
       // Parse existing cart data
       var existingCart = JSON.parse(cart);
       // Add new item to existing cart data
       existingCart.push(newItem);
       // Store updated cart data in localStorage
       localStorage.setItem('cart', JSON.stringify(existingCart));
   } else {
       // Create a new cart with the new item
       localStorage.setItem('cart', JSON.stringify([newItem]));
   }

   // Update total quantity in navbar
   updateTotalQuantity();

   findItemInCart(itemName, selectedSize);
   // Show alert
   alert('Item added to cart!');

   // Refresh the page to reflect changes
   location.reload();

   findItemInCart(itemName, selectedSize);
} 


// && cartItems[i].size === selectedSize

// findItemInCart(itemName, selectedSize)

// Function to find if an item with the same name and size already exists in the cart
function findItemInCart(itemName) {
    var cart = localStorage.getItem('cart');
    if (cart) {
        var cartItems = JSON.parse(cart);
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].name === itemName ) {
                return cartItems[i];
            }
        }
    }
    return null;
}



function populateCart() {
    // Retrieve cart data from localStorage
    var cart = localStorage.getItem('cart');
    var checkoutPrice = 0; // Initialize total checkout price accumulator
    
    if (cart) {
        // Parse the cart items from localStorage
        var cartItems = JSON.parse(cart);
        
        // Get references to DOM elements where cart items will be displayed
        var cartDiv = document.getElementById('cart'); // Container for cart items
        var checkoutPriceElement = document.getElementById('checkoutPrice'); // Element to display total checkout price
        
        // Iterate through each item in the cartItems array
        cartItems.forEach(function (item, index) {
            // Create a div element for each cart item
            var itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item'); // Add a CSS class for styling
            
            // Create a div for displaying item image
            var imgDiv = document.createElement('div');
            imgDiv.classList.add('img');
            imgDiv.innerHTML = '<img src="' + item.imageURL + '" alt="' + item.name + '" width="50px">'; // Display item image
            
            // Create a div for displaying item name, price, size, and quantity
            var namePriceDiv = document.createElement('div');
            namePriceDiv.classList.add('name-price');
            namePriceDiv.innerHTML = '<h3>' + item.name + '</h3><p class="price">' + item.price + '</p><p>Size: ' + item.size + '</p><p>Quantity: ' + item.quantity + '</p>';
            
            // Create a div for displaying total price of the item
            var totalDiv = document.createElement('div');
            totalDiv.classList.add('total');
            var itemTotal = item.price * item.quantity; // Calculate total price for this item
            totalDiv.innerHTML = '<p>Total: ' + itemTotal + 'Ksh</p>';
            
            // Create a button to delete the item from the cart
            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function () {
                removeFromCart(index); // Call removeFromCart function with the index of this item
            };
            
            // Append all created elements to the itemDiv
            itemDiv.appendChild(imgDiv);
            itemDiv.appendChild(namePriceDiv);
            itemDiv.appendChild(totalDiv);
            itemDiv.appendChild(deleteButton);
            
            // Append itemDiv to the cart container (cartDiv)
            cartDiv.appendChild(itemDiv);
            
            // Update checkout price accumulator
            checkoutPrice += itemTotal;
        });
        
        // Update checkout price element in the DOM
        checkoutPriceElement.innerText = 'Total Price: ' + checkoutPrice + 'Ksh';
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Retrieve cart data from localStorage
    var cart = localStorage.getItem('cart');
    if (cart) {
        // Parse cart data
        var cartItems = JSON.parse(cart);
        // Remove item at specified index
        cartItems.splice(index, 1);
        // Update cart data in localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        // Update total quantity in navbar
        updateTotalQuantity();
        // Reload the page to reflect the changes
        location.reload();
    }
}




// Call populateCart function when the page loads
window.onload = function () {
    populateCart();
    updateTotalQuantity();
};








