// Get the select element
var limitSelect = document.getElementById("limitSelect");

limitSelect.addEventListener("change", function () {
  var selectedLimit = limitSelect.value;

  window.location.href = `/?limit=${selectedLimit}`;
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
    updateEditModal(productData);
  } catch (error) {
    console.error('Error editing product:', error);
  }
}

function saveEditedProduct(productId) {
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


// const socket = io();

// socket.emit('message', "home conecction")

