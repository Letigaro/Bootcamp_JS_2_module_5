let puntuacion: number = 0;
let cartaSiguiente: number | null = null;

function dameCarta(): number {
  const posiblesValores = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  const numeroAleatorio = Math.floor(Math.random() * posiblesValores.length);
  cartaSiguiente = posiblesValores[numeroAleatorio];
  return cartaSiguiente;
}
function mostrarCarta(valorCarta: number): void {
  const imagenDiv = document.getElementById("imagen-carta") as HTMLImageElement;

  if (!imagenDiv) {
    console.error("Elemento 'imagen-carta' no encontrado.");
    return;
  }

  let urlImagen: string;

  switch (valorCarta) {
    case 0:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      break;
    case 1:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      console.error("Valor de carta inválido.");
      return;
  }

  imagenDiv.src = urlImagen;
}
function mostrarPuntuacion(puntuacion: number): void {
  const puntuacionDiv = document.getElementById("puntuacion");
  if (puntuacionDiv) {
    if (puntuacion > 7.5) {
      puntuacionDiv.textContent = `Puntuación: ${puntuacion} --> GAME OVER`;
      deshabilitarBotonMeRindo();
    } else {
      puntuacionDiv.textContent = `Puntuación: ${puntuacion}`;
    }
  } else {
    console.log("Error");
  }
}

function actualizarPuntuacion(puntuacion: number, valorCarta: number): number {
  if (valorCarta >= 10) {
    puntuacion += 0.5;
  } else {
    puntuacion += valorCarta;
  }
  return puntuacion;
}
function deshabilitarBotonCartaNueva(): void {
  const botonPideCarta = document.getElementById("dame_carta") as HTMLButtonElement;
  if (botonPideCarta) {
    botonPideCarta.disabled = true;
  } else {
    console.error("Botón 'Nueva Carta' no encontrado.");
  }
}
function deshabilitarBotonMeRindo(): void {
  const botonMeRindo = document.getElementById("rendirse") as HTMLButtonElement;
  if (botonMeRindo) {
    botonMeRindo.disabled = true;
  } else {
    console.error("Botón 'Me rindo' no encontrado.");
  }
}
function deshabilitarBotonVerCarta(): void {
  const botonVerCarta = document.getElementById("ver_carta") as HTMLButtonElement;
  if (botonVerCarta) {
    botonVerCarta.disabled = true;
  } else {
    console.error("Botón '¿Quieres ver qué carta venía ahora?' no encontrado.");
  }
}
function mostrarBotonNuevaPartida(): void {
  const botonNuevaPartida = document.getElementById("nueva_partida") as HTMLButtonElement;
  if (botonNuevaPartida) {
    botonNuevaPartida.style.display = "block";
  }
}
function mostrarBotonVerCarta(): void {
  const botonVerCarta = document.getElementById("ver_carta") as HTMLButtonElement;
  if (botonVerCarta) {
      botonVerCarta.style.display = "block";
  } else {
  console.error("Botón '¿Quieres ver qué carta venía ahora?' no encontrado.");
  }
}
function noMostrarBotonVerCarta(): void {
  const botonVerCarta = document.getElementById("ver_carta") as HTMLButtonElement;
  if (botonVerCarta) {
    botonVerCarta.style.display = "none";  // Oculta el botón
  } else {
    console.error("Botón '¿Quieres ver qué carta venía ahora?' no encontrado.");
  }
}
function habilitarBotonMeRindo(): void {
  const botonMeRindo = document.getElementById("rendirse") as HTMLButtonElement;
  if (botonMeRindo) {
    botonMeRindo.disabled = false;
  } else {
    console.error("Botón 'Me rindo' no encontrado.");
  }
}
function handleClickDameCarta(): void {
  if (puntuacion > 7.5) {
    return;
  }

  const valorCarta = dameCarta();
  mostrarCarta(valorCarta);
  puntuacion = actualizarPuntuacion(puntuacion, valorCarta);
  mostrarPuntuacion(puntuacion);

  if (puntuacion > 7.5) {
    deshabilitarBotonCartaNueva();
    mostrarBotonNuevaPartida();
  }
}
function handleClickMeRindo(): void {
  deshabilitarBotonCartaNueva();

  let mensaje: string = "";
  if (puntuacion < 4) {
    mensaje = "Has sido muy conservador";
  } else if (puntuacion === 5) {
    mensaje = "Te ha entrado el canguelo eh?";
  } else if (puntuacion === 6 || puntuacion === 7) {
    mensaje = "Casi casi...";
  } else if (puntuacion === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
  }

  const mensajeDiv = document.getElementById("mensaje-final");
  if (mensajeDiv) {
    mensajeDiv.textContent = mensaje;
  }

  mostrarBotonNuevaPartida();
  mostrarBotonVerCarta(); 
}
function handleNuevaPartida(): void {
  puntuacion = 0;
  cartaSiguiente = null;
  mostrarCarta(0);
  mostrarPuntuacion(puntuacion);
  habilitarBotonMeRindo();

  const botonPideCarta = document.getElementById("dame_carta") as HTMLButtonElement;
  if (botonPideCarta) {
    botonPideCarta.disabled = false;
  }

  const mensajeDiv = document.getElementById("mensaje-final");
  if (mensajeDiv) {
    mensajeDiv.textContent = "";
  }

  const botonNuevaPartida = document.getElementById("nueva_partida") as HTMLButtonElement;
  if (botonNuevaPartida) {
    botonNuevaPartida.style.display = "none";
  }
}
function handleClickVerCarta(): void {
  const valorCarta = dameCarta();
  mostrarCarta(valorCarta);  
  deshabilitarBotonMeRindo();
  noMostrarBotonVerCarta();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPuntuacion(puntuacion);
  mostrarCarta(0);

  const botonPideCarta = document.getElementById("dame_carta");
  if (botonPideCarta) {
    botonPideCarta.addEventListener("click", handleClickDameCarta);
  } else {
    console.error("Botón 'Nueva Carta' no encontrado.");
  }

  const botonMeRindo = document.getElementById("rendirse");
  if (botonMeRindo) {
    botonMeRindo.addEventListener("click", handleClickMeRindo);
  } else {
    console.error("Botón 'Me rindo' no encontrado.");
  }

  const botonNuevaPartida = document.getElementById("nueva_partida");
  if (botonNuevaPartida) {
    botonNuevaPartida.addEventListener("click", handleNuevaPartida);
  } else {
    console.error("Botón 'Nueva Partida' no encontrado.");
  }

  const botonVerCarta = document.getElementById("ver_carta");
  if (botonVerCarta) {
    botonVerCarta.addEventListener("click", handleClickVerCarta);
  } else {
    console.error("Botón '¿Quieres ver qué carta venía ahora?' no encontrado.");
  }

});