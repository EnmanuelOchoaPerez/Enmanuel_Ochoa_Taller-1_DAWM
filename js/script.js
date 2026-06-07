// ===============================
// OBTENER ELEMENTOS DEL HTML
// ===============================

// Captura los campos de entrada del formulario
const producto = document.getElementById("producto");
const categoria = document.getElementById("categoria");
const precio = document.getElementById("precio");
const cantidad = document.getElementById("cantidad");
const descuento = document.getElementById("descuento");

// Captura los botones
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpiar = document.getElementById("btnLimpiar");

// Elementos donde se mostrará información en pantalla
const vistaProducto = document.getElementById("vistaProducto");
const mensaje = document.getElementById("mensaje");

// Elementos que mostrarán los resultados del cálculo
const resultadoProducto = document.getElementById("resultadoProducto");
const resultadoCategoria = document.getElementById("resultadoCategoria");
const resultadoSubtotal = document.getElementById("resultadoSubtotal");
const resultadoDescuento = document.getElementById("resultadoDescuento");
const resultadoTotal = document.getElementById("resultadoTotal");


// ===============================
// CONSTANTES
// ===============================

// Porcentaje fijo de descuento (10%)
const PORCENTAJE_DESCUENTO = 0.10;


// ===============================
// EVENTOS
// ===============================

// Evento "input":
// Se ejecuta cada vez que el usuario escribe
// dentro del campo producto.
producto.addEventListener("input", () => {

    // Si el campo está vacío
    if (producto.value === "") {
        vistaProducto.textContent = "Ninguno";
    }
    // Si contiene texto
    else {
        vistaProducto.textContent = producto.value;
    }
});


// Evento del botón Calcular
btnCalcular.addEventListener("click", () => {
    calcularVenta();
});


// Evento del botón Limpiar
btnLimpiar.addEventListener("click", () => {
    limpiarFormulario();
});


// ===============================
// FUNCIÓN PRINCIPAL
// ===============================

// Función encargada de realizar todo el proceso
// de cálculo de la venta.
function calcularVenta() {

    // Obtiene los valores ingresados por el usuario
    let nombreProducto = producto.value;
    let nombreCategoria = categoria.value;

    // Convierte los datos a números
    let precioUnitario = Number(precio.value);
    let cantidadProducto = Number(cantidad.value);

    // Obtiene si el checkbox está marcado
    let aplicaDescuento = descuento.checked;


    // Valida que los datos sean correctos
    if (
        validarDatos(
            nombreProducto,
            nombreCategoria,
            precioUnitario,
            cantidadProducto
        ) === false
    ) {

        mensaje.textContent =
            "Error: complete todos los datos correctamente.";

        return;
    }

    // Calcula el subtotal
    let subtotal =
        calcularSubtotal(precioUnitario, cantidadProducto);

    // Calcula el descuento
    let valorDescuento =
        calcularDescuento(subtotal, aplicaDescuento);

    // Calcula el total final
    let total =
        calcularTotal(subtotal, valorDescuento);

    // Crea un objeto con toda la información
    let venta =
        crearObjetoVenta(
            nombreProducto,
            nombreCategoria,
            subtotal,
            valorDescuento,
            total
        );

    // Muestra el resultado en pantalla
    mostrarResultado(venta);

    // Mensaje de éxito
    mensaje.textContent =
        "Venta calculada correctamente.";
}


// ===============================
// VALIDACIÓN DE DATOS
// ===============================

// Verifica que todos los campos tengan datos válidos.
// Retorna true o false.
function validarDatos(
    nombreProducto,
    nombreCategoria,
    precioUnitario,
    cantidadProducto
) {

    // Validar nombre del producto
    if (nombreProducto === "") {
        return false;
    }

    // Validar categoría
    if (nombreCategoria === "") {
        return false;
    }

    // Validar precio
    if (precioUnitario <= 0) {
        return false;
    }

    // Validar cantidad
    if (cantidadProducto <= 0) {
        return false;
    }

    // Todos los datos son correctos
    return true;
}


// ===============================
// CÁLCULO DEL SUBTOTAL
// ===============================

// Multiplica precio por cantidad.
function calcularSubtotal(
    precioUnitario,
    cantidadProducto
) {
    return precioUnitario * cantidadProducto;
}


// ===============================
// CÁLCULO DEL DESCUENTO
// ===============================

// Aplica el 10% si el usuario marcó
// la casilla de descuento.
function calcularDescuento(
    subtotal,
    aplicaDescuento
) {

    if (aplicaDescuento === true) {
        return subtotal * PORCENTAJE_DESCUENTO;
    }

    return 0;
}


// ===============================
// CÁLCULO DEL TOTAL
// ===============================

// Resta el descuento al subtotal.
function calcularTotal(
    subtotal,
    valorDescuento
) {
    return subtotal - valorDescuento;
}


// ===============================
// CREAR OBJETO VENTA
// ===============================

// Construye un objeto con toda la información
// de la venta calculada.
function crearObjetoVenta(
    nombreProducto,
    nombreCategoria,
    subtotal,
    valorDescuento,
    total
) {

    let venta = {

        // Nombre del producto vendido
        producto: nombreProducto,

        // Categoría seleccionada
        categoria: nombreCategoria,

        // Valor antes del descuento
        subtotal: subtotal,

        // Valor descontado
        descuento: valorDescuento,

        // Valor final a pagar
        total: total
    };

    return venta;
}


// ===============================
// MOSTRAR RESULTADOS
// ===============================

// Recibe el objeto venta y actualiza
// los elementos HTML.
function mostrarResultado(venta) {

    resultadoProducto.textContent =
        venta.producto;

    resultadoCategoria.textContent =
        venta.categoria;

    // toFixed(2) muestra 2 decimales
    resultadoSubtotal.textContent =
        venta.subtotal.toFixed(2);

    resultadoDescuento.textContent =
        venta.descuento.toFixed(2);

    resultadoTotal.textContent =
        venta.total.toFixed(2);
}


// ===============================
// LIMPIAR FORMULARIO
// ===============================

// Restablece todos los campos y resultados.
function limpiarFormulario() {

    // Vacía los inputs
    producto.value = "";
    categoria.value = "";
    precio.value = "";
    cantidad.value = "";

    // Desmarca el checkbox
    descuento.checked = false;

    // Reinicia vista previa
    vistaProducto.textContent = "Ninguno";

    // Mensaje inicial
    mensaje.textContent =
        "Ingrese los datos y calcule la venta.";

    // Reinicia resultados
    resultadoProducto.textContent = "---";
    resultadoCategoria.textContent = "---";
    resultadoSubtotal.textContent = "0.00";
    resultadoDescuento.textContent = "0.00";
    resultadoTotal.textContent = "0.00";
}