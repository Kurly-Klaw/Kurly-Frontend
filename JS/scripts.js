function servicos() {
  console.log("Rodei");
  fetch("/JS/dados.json")
    .then((response) => response.json())
    .then((data) => {
      let temp = document.createElement("article");
      data.promos.forEach((promo) => {
        const f = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const bb = document.createElement("button");
        
        f.id = promo.id;
        f.classList.add("carrossel");
        img.src = promo.img;
        f.appendChild(img);
        bb.innerHTML  = "<p>Agendar</p>";         
        figcaption.classList.add("flex", "flex-row","mb-4","text-black");
        h2.textContent = promo.titulo;
        p.textContent = `R$ ${promo.preco},00`;
        div.classList.add("card-header");
        div.appendChild(h2);
        div.appendChild(p);
        
        figcaption.innerHTML=`${div.outerHTML}${bb.outerHTML}`;
        f.appendChild(figcaption);
        temp.appendChild(f)
      });
      document.getElementById("promos").prepend(temp);
    });
}

document.addEventListener("DOMContentLoaded", servicos);

function mudar(){
  console.log("mudou");

}

// Chat gptélson


document.addEventListener("DOMContentLoaded", () => {
  fetch("/JS/dados.json")
      .then(response => response.json())
      .then(data => renderCarrossel(data.promos))
      .catch(error => console.error("Erro ao carregar os dados:", error));
});

function renderCarrossel(promos) {
  const container = document.getElementById("promos");
  container.innerHTML = ""; // Limpa antes de adicionar

  promos.forEach((promo, index) => {
      const figure = document.createElement("figure");
      figure.classList.add("carrossel");
      if (index === 0) figure.classList.add("expanded"); // O primeiro começa expandido

      figure.innerHTML = `
          <img src="${promo.img}" alt="${promo.titulo}">
          <figcaption>
              <h2>${promo.titulo}</h2>
              <p>R$ ${promo.preco},00</p>
              <button>Agendar</button>
          </figcaption>
      `;

      figure.addEventListener("click", () => expandirCarrossel(figure));
      container.appendChild(figure);
  });

  addSwipeEvents(container);
}

function expandirCarrossel(ativo) {
  document.querySelectorAll(".carrossel").forEach(el => {
      el.classList.remove("expanded");
  });

  ativo.classList.add("expanded");
}

// Adiciona suporte a arrastar para mudar os itens no touch
function addSwipeEvents(container) {
  let startX = 0;
  let scrollLeft = 0;

  container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
  });

  container.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 2; // Multiplicador para aumentar o efeito de arrastar
      container.scrollLeft = scrollLeft + walk;
  });

  container.addEventListener("touchend", () => {
      const figures = document.querySelectorAll(".carrossel");
      let closest = figures[0];
      let minDiff = Math.abs(figures[0].getBoundingClientRect().left);

      figures.forEach((fig) => {
          let diff = Math.abs(fig.getBoundingClientRect().left);
          if (diff < minDiff) {
              minDiff = diff;
              closest = fig;
          }
      });

      expandirCarrossel(closest);
      closest.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
