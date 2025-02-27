document.addEventListener("alpine:init", () => {
  Alpine.data('produk', () => ({
    items: [
      { id: 1, name: "Arabica", img: "img1.jpg", price: 150000 },
      { id: 2, name: "Robusta", img: "img2.jpeg", price: 170000 },
      { id: 3, name: "Liberika", img: "img3.jpeg", price: 200000 },
      { id: 4, name: "Excelsa", img: "img4.jpg", price: 220000 },
      { id: 5, name: "Espresso", img: "img5.jpeg", price: 100000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // true item
      const cartItem = this.items.find((item) => item.id === newItem.id); 
      // false item
      if(!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
           if(item.id !== newItem.id) {
            return item
           } else {
            item.quantity++;
            item.total = item.price * item.quantity; 
            this.quantity++;
            this.total += item.price; 
            return item;
           }
        })
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      
      if(cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if(item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total-= cartItem.price;
      }
    },
  });
});

// validasi form
// const checkoutButton = document.querySelector('.checkout-btn');
// checkoutButton.disabled = true;

// const form = document.querySelector('#checkout-store');
// form.addEventListener('keyup', function() {
//   let = allFilled = true;
//   for(let i = 0; i < form.elements.length; i++) {
//     if(form.elements[i].value.trim() === '') {
//       allFilled = false;
//       break;
//     }
//   }
//   if(allFilled) {
//     checkoutButton.disabled = true;
//     checkoutButton.classList.remove('disabled');
//   } else {
//     checkoutButton.disabled = false;
//     checkoutButton.classList.add('disabled');
//   }
// });

// // send data
// checkoutButton.addEventListener('click', function (e) {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const data = new URLSearchParams(formData);
//   const objData = Object.fromEntries(data);
//   console.log(objData);
// });

// const checkoutButton = document.querySelector('.checkout-btn');
// checkoutButton.disabled = true;

// const form = document.querySelector('#checkout-store');
// form.addEventListener('keyup', function() {
//   let allFilled = true;
//   for(let i = 0; i < form.elements.length; i++) {
//     if(form.elements[i].value.trim() === '') {
//       allFilled = false;
//       break;
//     }
//   }
  
//   if(allFilled) {
//     checkoutButton.disabled = false;
//     checkoutButton.classList.remove('disabled');
//   } else {
//     checkoutButton.disabled = true;
//     checkoutButton.classList.add('disabled');
//   }
// });

// // send data
// checkoutButton.addEventListener('click', function (e) {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const data = new URLSearchParams(formData); 
//   const objData = Object.fromEntries(data).items;
//   console.log(objData); 
// });

const checkoutButton = document.querySelector('.checkout-btn');
checkoutButton.disabled = true;

const form = document.querySelector('#checkout-store');
form.addEventListener('keyup', function() {
  let allFilled = true;
  for(let i = 0; i < form.elements.length; i++) {
    if(form.elements[i].value.trim() === '') {
      allFilled = false;
      break;
    }
  }
  
  if(allFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add('disabled');
  }
});

// send data
checkoutButton.addEventListener('click', function (e) {
  e.preventDefault();
  
  // Mengambil data dari form
  const formData = new FormData(form);
  const objData = Object.fromEntries(formData.entries());

  // Mengakses data 'items'
  const items = objData.items;

  // Output data 'items' ke console
  console.log(items);
});

// convert
const rp = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};