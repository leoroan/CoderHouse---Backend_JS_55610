console.log("hello there!");
const socket = io();
socket.emit('message', "products connection");
const button = document.querySelector("#saveNewProduct");

button.addEventListener("click", (e) => {
  e.preventDefault();

  var title = document.querySelector("#title").value;
  var description = document.querySelector("#description").value;
  var price = document.querySelector("#price").value;
  var thumbnail = document.querySelector("#thumbnail").value;
  var code = document.querySelector("#code").value;
  var stock = document.querySelector("#stock").value;
  var category = document.querySelector("#category").value;

  if (title.trim() !== "" && description.trim() !== "" && price.trim() !== "" && thumbnail.trim() !== "" && code.trim() !== "" && stock.trim() !== "" && category.trim() !== "") {
    const product = {
      title, description, price, thumbnail, code, stock, category
    };
    socket.emit("new_product", product);
  } else {
    console.log("Please fill in all fields.");
  }  

});

socket.on('product_list', (data) => {
  const card = (prod) => {
    return `
      <div class="col mb-5">
        <div class="card border-dark mb-3" style="max-width: 18rem;">
          <div class="card-header"></div>
          <img class="card-img-top" src=${prod.thumbnail} alt=${prod.title} />
          <div class="card-body">
            <h5 class="card-title">${prod.title}</h5>
            <p class="card-text">${prod.description}</p>
            <p class="card-text">${prod.price}</p>
          </div>
        </div>
      </div>
    `;
  };

  const cardProductContainer = document.getElementById('mainCardProductContainer');
  const cards = data.map(card);
  cardProductContainer.innerHTML = cards.join('');
});





