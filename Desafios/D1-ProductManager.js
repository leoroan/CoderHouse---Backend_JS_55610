
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
class Product {
 constructor(id, title, description, price, thumbnail, code, stock) {
   this.id = id;
   this.title = title;
   this.description = description;
   this.price = price;
   this.thumbnail = thumbnail;
   this.code = code;
   this.stock = stock;
 }
}

class ProductManager {
 constructor() {
   this.products = [];
 }
 addProduct(title, description, price, thumbnail, code, stock) {
   const codeExist = this.products.find((product) => product.code === code);
   if (!codeExist) {
     const id = this.products.length + 1;
     const newProduct = new Product(id, title, description, price, thumbnail, code, stock);
     products.push(newProduct);
   } else {
     throw new Error('Product code already exists');
   }

 }
 getProducts() {
   return this.products;
 }

 getProductById(productId) {
   if (!productId) {
     throw new Error('Product ID is required');
   }

   if (typeof productId !== 'number') {
     throw new Error('Product ID must be a number');
   }

   if (!this.products.find(product => product.id === productId)) {
     throw new Error('Product not found');
   }

   return this.products.find(product => product.id === productId);
 }
}

// #TESTs

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
const products = productManager.getProducts();
console.log("Productos al principio:", products);

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
try {
 productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
 console.log("Producto agregado");
} catch (error) {
 console.error("Error al agregar producto:", error.message);
}

// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log("Productos después de agregar uno:", productManager.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
try {
 productManager.addProduct("Otro producto", "Descripción", 150, "Otra imagen", "abc123", 10);
 console.log("Producto agregado satisfactoriamente.");
} catch (error) {
 console.error("Error al agregar producto:", error.message);
}

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
try {
 const productId = productManager.getProducts()[0].id;
 const foundProduct = productManager.getProductById(productId);
 console.log("Producto encontrado por ID:", foundProduct);
} catch (error) {
 console.error("Error al buscar producto por ID:", error.message);
}
