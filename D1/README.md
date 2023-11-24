# Clases con ECMAScript y ECMAScript avanzado

## Consigna

Realizar una clase “ProductManager” que gestione un conjunto de productos.

## Aspectos a incluir

- Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

- Cada producto que gestione debe contar con las propiedades:
  - title (nombre del producto)
  - description (descripción del producto)
  - price (precio)
  - thumbnail (ruta de imagen)
  - code (código identificador)
  - stock (número de piezas disponibles)

## Aspectos a incluir

- Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
  - Validar que no se repita el campo “code” y que todos los campos sean obligatorios.
  - Al agregarlo, debe crearse con un id autoincrementable.

- Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento.

- Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id.
  - En caso de no coincidir ningún id, mostrar en consola un error “Not found”

## Formato del entregable

Archivo de Javascript listo para ejecutarse desde node.

## DESAFÍO ENTREGABLE - PROCESO DE TESTING

Clases con ECMAScript y ECMAScript avanzado

1. Se creará una instancia de la clase “ProductManager”.

2. Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [].

3. Se llamará al método “addProduct” con los campos:
   - title: “producto prueba”
   - description:”Este es un producto prueba”
   - price:200,
   - thumbnail:”Sin imagen”
   - code:”abc123”,
   - stock:25
   - El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.

4. Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado.

5. Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

6. Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo.
