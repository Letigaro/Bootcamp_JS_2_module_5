let puntuacion: number = 0;

function mostrarPuntuacion (puntuacion:number){
  const puntuacionDiv = document.getElementById("puntuacion");
  if (puntuacionDiv){
    if (puntuacion > 7.5) {
      puntuacionDiv.textContent = `Puntuación: ${puntuacion} --> GAME OVER`;
    } else {
      puntuacionDiv.textContent = `Puntuación: ${puntuacion}`;
    }
} else {
  console.log("Error");
}
}
function dameCarta (){
  const posiblesValores = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  const numeroAleatorio = Math.floor(Math.random() * posiblesValores.length);
  return posiblesValores[numeroAleatorio];
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
      // Carta boca abajo
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      break;
    case 1:
      // 1 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      // 2 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      // 3 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      // 4 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      // 5 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      // 6 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      // 7 de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      // Sota de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      // Caballo de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      // Rey de copas
      urlImagen = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      console.error("Valor de carta inválido.");
      return;
  }

  imagenDiv.src = urlImagen;
}

function actualizarPuntuacion(puntuacion: number, valorCarta: number): number {
  if (valorCarta >= 10) {
    puntuacion = puntuacion + 0.5; 
  } else {
    puntuacion = puntuacion + valorCarta; 
  }
  return puntuacion;
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
  }

}
function deshabilitarBotonCartaNueva ():void{
  const botonPideCarta = document.getElementById("dame_carta") as HTMLButtonElement;
  if (botonPideCarta) {
    botonPideCarta.disabled = true;
  }
  else{
    console.error("Botón 'Nueva Carta' no encontrado.");
  }
}

function handleClickMeRindo ():void {
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
  if (botonMeRindo){
    botonMeRindo.addEventListener("click", handleClickMeRindo);
  } else {
    console.error("Botón 'Me rindo' no encontrado.");
  }

});

// FALTA POR AÑADIR:
// - BOTON NUEVA PARTIDA
// - BOTON TRAS RENDIRSE QUIERES SABER QUE CARTA VENIA DESPUES?