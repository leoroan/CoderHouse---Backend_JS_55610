// Get the select element
var limitSelect = document.getElementById("limitSelect");

limitSelect.addEventListener("change", function () {
  var selectedLimit = limitSelect.value;

  window.location.href = `/?limit=${selectedLimit}`;
});

function showDeleteAlert(button) {
  var productId = button.getAttribute('data-product-id');

  var userConfirmed = confirm('Are you sure you want to delete this item?');

  if (userConfirmed) {
    deleteProduct(productId);
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

