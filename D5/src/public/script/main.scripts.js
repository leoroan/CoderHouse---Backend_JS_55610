// Get the select element
var limitSelect = document.getElementById("limitSelect");

limitSelect.addEventListener("change", function () {
  var selectedLimit = limitSelect.value;

  window.location.href = `/?limit=${selectedLimit}`;
});

var categorySelect = document.getElementById("categorySelect");

categorySelect.addEventListener("change", function () {
  var selectedCategory = categorySelect.value;
  window.location.href = `/?category=${selectedCategory}`;
});

var sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", function () {
  var selectedSort = sortSelect.value;
  window.location.href = `/?sort=${selectedSort}`;
});


function showDeleteAlert(button) {
  var productId = button.getAttribute('data-product-id');

  var userConfirmed = confirm('Are you sure you want to DELETE this item?');

  if (userConfirmed) {
    deleteProduct(productId);
  }
}

async function editModal(productId) {
  try {
    const productData = await getProductById(productId);
    console.log(productData);
    updateEditModal(productData);
  } catch (error) {
    console.error('Error editing product:', error);
  }
}

async function saveNewProduct() {
  let title = document.getElementById('newmodal_title').value;
  let description = document.getElementById('newmodal_description').value;
  let price = document.getElementById('newmodal_price').value;
  let oldPrice = document.getElementById('newmodal_oldPrice').value;
  let thumbnail = document.getElementById('newmodal_thumbnail').value;
  let code = document.getElementById('newmodal_code').value;
  let stock = document.getElementById('newmodal_stock').value;
  let status = document.getElementById('newmodal_status').value;
  let category = document.getElementById('newmodal_category').value;

  if (
    title.trim() !== "" &&
    description.trim() !== "" &&
    price.trim() !== "" &&
    oldPrice.trim() !== "" &&
    thumbnail.trim() !== "" &&
    code.trim() !== "" &&
    stock.trim() !== "" &&
    status.trim() !== "" &&
    category.trim() !== ""
  ) {
    const product = {
      title,
      description,
      price,
      oldPrice,
      thumbnail,
      code,
      stock,
      status,
      category
    };

    try {
      const response = await fetch(`api/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      location.reload();

    } catch (error) {
      console.error('Error:', error.message);
    }
  } else {
    console.error('Validation error: All fields must be filled');
  }
}


async function saveEditedProduct(productId) {
  const title = document.getElementById('editmodal_title').value;
  const description = document.getElementById('editmodal_description').value;
  const price = document.getElementById('editmodal_price').value;
  const oldPrice = document.getElementById('editmodal_oldPrice').value;
  const thumbnail = document.getElementById('editmodal_thumbnail').value;
  const code = document.getElementById('editmodal_code').value;
  const stock = document.getElementById('editmodal_stock').value;
  const status = document.getElementById('editmodal_status').value;
  const category = document.getElementById('editmodal_category').value;

  const productData = {
    title,
    description,
    price,
    oldPrice,
    thumbnail,
    code,
    stock,
    status,
    category,
  };

  const url = `api/products/${productId}`;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Product updated successfully:', data);
      location.reload();
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
}


function updateEditModal(productData) {
  document.getElementById('editmodal_title').value = productData.title;
  document.getElementById('editmodal_description').value = productData.description;
  document.getElementById('editmodal_price').value = productData.price;
  document.getElementById('editmodal_oldPrice').value = productData.oldPrice;
  document.getElementById('editmodal_thumbnail').value = productData.thumbnail;
  document.getElementById('editmodal_code').value = productData.code;
  document.getElementById('editmodal_stock').value = productData.stock;
  document.getElementById('editmodal_status').value = productData.status;
  document.getElementById('editmodal_category').value = productData.category;

  var saveButton = document.getElementById("saveEditedProduct");
  saveButton.onclick = function () { saveEditedProduct(productData._id) }

}

async function getProductById(productId) {
  const url = `api/products/${productId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const productData = await response.json();
      return productData;
    } else {
      console.error('Error:', response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function deleteProduct(productId) {
  fetch(`api/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(response => {
      if (response.ok) {
        console.log(response);
        location.reload();
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function addToCart(userId, productId) {

  const url = `api/carts/${userId}/product/${productId}/1`;
  try {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        alert('Product added to cart');
      })
      .catch(error => {
        alert('Error adding product to cart. Please try again.');
        console.log(error);
      });
  }
  catch (error) {
    console.log(error);
  }
}

function deleteFromCart(cartId, productId) {
  const url = `/api/carts/${cartId}/product/${productId}`;

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('Product deleted from cart');
      location.reload();
    })
    .catch(error => {
      alert('Error deleting product from cart. Please try again.');
    });

}
// login func
const loginButton = document.getElementById("loginbtn");
loginButton.onclick = function (e) {
  e.preventDefault();
  let email = document.getElementById('inputEmail1').value;
  let password = document.getElementById('inputPassword1').value;
  const obj = { "email": email, "password": password };
  fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      window.location.replace('/');
    }
  })
}

// Register func
const registerButton = document.getElementById("registerbtn");
registerButton.onclick = function (e) {
  e.preventDefault(); 3
  let username = document.getElementById('inputUsername2').value;
  let email = document.getElementById('inputEmail2').value;
  let password = document.getElementById('inputPassword2').value;
  const obj = { "username": username, "email": email, "password": password };
  fetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      alert("User registered successfully. Please login.");
      window.location.replace('/');
    } else if (result.status === 400) {
      alert("Validation failed. Please check your inputs. username and email are uniques");
    } else if (result.status === 500) {
      alert("Internal server error. Please try again later.");
    } else {
      alert("An unexpected error occurred.");
    }
  });
}

function handleLogout() {
  fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      window.location.replace('/');
    }
  })
}


// const socket = io();

// socket.emit('message', "home conecction")

