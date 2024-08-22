// Obtener elementos del DOM
const documento = document;
const textoEntrada = documento.getElementById('input-text');  
const textoSalida = documento.getElementById('output-text'); 
const botonEncriptar = documento.getElementById('encrypt-btn'); 
const botonDesencriptar = documento.getElementById('decrypt-btn'); 
const botonCopiar = documento.getElementById('copy-btn');      
const imagenSalida = documento.getElementById('output-image'); 


function encriptarTexto(texto) {
    const encriptacionTexto = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    return texto.split('').map(caracter => encriptacionTexto[caracter] || caracter).join('');
}

function desencriptarTexto(texto) {
    const desincreptacionTexto = {
        'ufat': 'u',
        'ober': 'o',
        'imes': 'i',
        'enter': 'e',
        'ai': 'a'
    };

    return Object.keys(desincreptacionTexto).reduce((acumulador, clave) => acumulador.replace(new RegExp(clave, 'g'), desincreptacionTexto[clave]), texto);
}

// Función para validar el texto
function validarTexto(texto) {
    const caracteresEspeciales = /[~!@#$%^&*()_+|}{[\]\\\/?><:"`;.,áéíóúàèìòù']/;
    const tieneMayusculas = /[A-Z]/;

    // Limpiar el texto de espacios y convertirlo a minúsculas
    const textoLimpio = texto.trim().toLowerCase();

    // Verificar si el texto contiene caracteres especiales
    if (caracteresEspeciales.test(textoLimpio)) {
        alert("No se permiten caracteres especiales");
        return true; 
    }
    
    // Verificar si el texto contiene mayúsculas
    if (tieneMayusculas.test(textoLimpio)) {
        alert("No se permiten mayúsculas");
        return true; // Texto inválido
    }
    
    // Verificar si el texto está vacío
    if (textoLimpio === "") {
        alert("Ingrese un mensaje para encriptar");
        return true; // Texto inválido
    }

    return false;
}

botonEncriptar.addEventListener('click', () => {
    const texto = textoEntrada.value.toLowerCase(); // Solo minúsculas y sin caracteres especiales
    if (!validarTexto(texto)) {
        const textoEncriptado = encriptarTexto(texto);
        textoSalida.value = textoEncriptado;
        imagenSalida.style.display = 'none';
    }
});

botonDesencriptar.addEventListener('click', () => {
    const texto = textoEntrada.value.toLowerCase(); // Solo minúsculas y sin caracteres especiales
    if (!validarTexto(texto)) {
        const textoDesencriptado = desencriptarTexto(texto);
        textoSalida.value = textoDesencriptado;
        imagenSalida.style.display = 'none';
    }
});

botonCopiar.addEventListener('click', () => {
    const textoParaCopiar = textoSalida.value;
    if (textoParaCopiar) {
        navigator.clipboard.writeText(textoParaCopiar)
            .then(() => {
                alert('Texto copiado');
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    }
});


