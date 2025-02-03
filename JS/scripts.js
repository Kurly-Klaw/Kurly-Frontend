function servicos() {
  // console.log("Rodei");

  fetch("/JS/dados.json")
    .then((response) => response.json())
    .then((data) => {
      // Carrega promoções
      const promocoes = document.getElementById("promos")
      data.promos.forEach((promo) => {
        const art = document.createElement("article");
        const img = document.createElement("img");
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        const title = document.createElement("h3");
        const preco = document.createElement("p");
        const descrit = document.createElement("p");
        const btn = document.createElement("button");

        img.src = promo.img;
        img.alt = `Imagem do serviço ${promo.nome}.`;
        title.textContent = promo.titulo;
        preco.textContent = `${promo.preco} • ${promo.duracao}`;
        descrit.textContent = promo.descricao;
        btn.textContent = "Agendar";
        div2.classList.add("content")
        
        div.append(title, preco, descrit)
        div2.append(div, btn)
        art.id = `promo-${promo.id}`;
        art.append(img, div2);
        promocoes.appendChild(art);
      });

      //Carrega demais serviços.
      const ul = document.createElement("ul");
      data.servicos.forEach((serv) => {
        const li = document.createElement("li");
        const art = document.createElement("article");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        const price = document.createElement("p");
        const descrit = document.createElement("p");
        const btn = document.createElement("button");

        li.setAttribute("onclick", "teste()")

        img.src = serv.img
        img.alt = `Imagem do serviço ${serv.nome}.`
        title.textContent = serv.nome
        price.textContent = `${serv.preco} • ${serv.duracao}`
        descrit.textContent = serv.descricao
        btn.textContent = "Agendar";

        art.append(title, price, descrit)
        li.append(img, art, btn)
        ul.appendChild(li)
      });
      // document.getElementById("promos").prepend(temp);
      document.getElementById("servicos").appendChild(ul);

    });


}

document.addEventListener("DOMContentLoaded", servicos);

function teste() {
  console.log("Chamou chamou?");

}

function mudar() {
  console.log("mudou");

}




// Chat gptélson


// document.addEventListener("DOMContentLoaded", () => {
//   fetch("/JS/dados.json")
//     .then(response => response.json())
//     .then(data => renderCarrossel(data.promos))
//     .catch(error => console.error("Erro ao carregar os dados:", error));
// });

// function renderCarrossel(promos) {
//   const container = document.getElementById("promos");
//   container.innerHTML = ""; // Limpa antes de adicionar

//   promos.forEach((promo, index) => {
//     const figure = document.createElement("figure");
//     figure.classList.add("carrossel");
//     if (index === 0) figure.classList.add("expanded"); // O primeiro começa expandido

//     figure.innerHTML = `
//           <img src="${promo.img}" alt="${promo.titulo}">
//           <figcaption>
//               <h2>${promo.titulo}</h2>
//               <p>R$ ${promo.preco},00</p>
//               <button>Agendar</button>
//           </figcaption>
//       `;

//     figure.addEventListener("click", () => expandirCarrossel(figure));
//     container.appendChild(figure);
//   });

//   addSwipeEvents(container);
// }

// function expandirCarrossel(ativo) {
//   document.querySelectorAll(".carrossel").forEach(el => {
//     el.classList.remove("expanded");
//   });

//   ativo.classList.add("expanded");
// }

// // Adiciona suporte a arrastar para mudar os itens no touch
// function addSwipeEvents(container) {
//   let startX = 0;
//   let scrollLeft = 0;

//   container.addEventListener("touchstart", (e) => {
//     startX = e.touches[0].pageX;
//     scrollLeft = container.scrollLeft;
//   });

//   container.addEventListener("touchmove", (e) => {
//     const x = e.touches[0].pageX;
//     const walk = (startX - x) * 2; // Multiplicador para aumentar o efeito de arrastar
//     container.scrollLeft = scrollLeft + walk;
//   });

//   container.addEventListener("touchend", () => {
//     const figures = document.querySelectorAll(".carrossel");
//     let closest = figures[0];
//     let minDiff = Math.abs(figures[0].getBoundingClientRect().left);

//     figures.forEach((fig) => {
//       let diff = Math.abs(fig.getBoundingClientRect().left);
//       if (diff < minDiff) {
//         minDiff = diff;
//         closest = fig;
//       }
//     });

//     expandirCarrossel(closest);
//     closest.scrollIntoView({ behavior: "smooth", block: "nearest" });
//   });
// }
