const slider = document.getElementById("slider");
const hair = document.getElementById("hair");
const hairType = document.getElementById("hairType");

slider.addEventListener("input", () => {
  manipularPath()
});

hairType.addEventListener("change", ativarPath);


function manipularPath() {
  // Seleciona todos os paths com a classe desejada
  let paths = document.querySelectorAll("path.hairTypes");

  if (paths.length === 0) return alert("Nenhum path ativo encontrado!");

  paths.forEach((path) => {
    let dOriginal = path.getAttribute("data-original-d"); // Recupera o d original
    if (!dOriginal) {
      path.setAttribute("data-original-d", path.getAttribute("d")); // Salva o d original
      dOriginal = path.getAttribute("d");
    }

    let comandos = dOriginal.split(" ");

    // Define o novo estado do corte (alternando entre curto, médio e longo)
    slider.value = (slider.value + 1) % 3;

    if (slider.value === 0) {
      // Curto: Remove mais nós
      comandos.splice(-4, 8);
    } else if (slider.value === 1) {
      // Médio: Remove menos nós
      comandos.splice(-2, 4);
    } else {
      // Longo: Restaura o original
      comandos = dOriginal.split(" ");
    }

    // Atualiza o atributo 'd' com a nova forma
    console.log(comandos[0]);
    path.setAttribute("d", comandos.join(" "));
    
  });
}

function ativarPath() {
  // Remove a classe 'active' de todos os paths
  document
    .querySelectorAll("path")
    .forEach((path) => path.classList.remove("active"));

  // Ativa o path correspondente
  switch (hairType.value) {
    case "Ondulado":
      document.getElementById("Ondulado").style.display = "inline";
      document.getElementById("Cacheado").style.display = "none";
      document.getElementById("Crespo").style.display = "none";
      break;
    case "Cacheado":
      document.getElementById("Ondulado").style.display = "none";
      document.getElementById("Cacheado").style.display = "inline";
      document.getElementById("Crespo").style.display = "none";
      break;
    case "Crespo":
      document.getElementById("Ondulado").style.display = "none";
      document.getElementById("Cacheado").style.display = "none";
      document.getElementById("Crespo").style.display = "inline";
      break;
    default:
      console.error("Tipo de cabelo inválido!");
      return;
  }
}
