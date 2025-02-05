function listServices() {
  //Definie quais serão os pais dos elementos
  const listaPromocoes = document.getElementById("promo-list");
  const listaServicos = document.getElementById("services-list");
  const listaAdicionais = document.getElementById("more-list");

  //pega os dados para popular
  fetch("./JS/dados.json")
    .then((file) => file.json())
    .then((data) => {
      //verifica se existem os elementos pai na página
      //console.warn(listaPromocoes, listaServicos);

      if (listaPromocoes || listaServicos || listaAdicionais) {
        /*
        Estrutura do produto
        <li>
        <article>
        <div class="imgCard">
        <img src="" alt="">
        </div>
        <div class="hdCard">
        <h3></h3>
        <p></p>
        </div>
        <div class="dtCard">
        <p></p>
        <p></p>
        </div>
        <div class="btnCard">
        <button></button>
        </div>
        </article>
        </li>
        
        */

        let btnText = "Agendar";

        Object.keys(data.items).forEach((key) => {
          const item = data.items[key];
          const isPromo = item.isPromo;

          const produto = document.createElement("li");
          const article = document.createElement("article");
          const img = document.createElement("img");
          const container = document.createElement("div");
          const dtCard = document.createElement("div");
          const hdCard = document.createElement("div");
          const btnCard = document.createElement("div");
          const imgCard = document.createElement("div");
          const title = document.createElement("h3");
          const subtitle = document.createElement("p");
          const dt1 = document.createElement("p");
          const dt2 = document.createElement("p");
          const btn = document.createElement("button");

          //adiciona classes aos elementos
          if (isPromo) article.classList.add("promo");
          else {
            article.classList.add("produto");
            article.setAttribute("onclick", "toggleCard(event)");
          }
          img.classList.add("imgProduto");
          imgCard.classList.add("imgCard");
          hdCard.classList.add("hdCard");
          dtCard.classList.add("dtCard");
          container.classList.add("flex", "flex-row");
          if (isPromo)btnCard.classList.add("btnCard", "btnPromo");
          else btnCard.classList.add("btnCard");
          if (!listaAdicionais) btn.classList.add("btnAgendar");
          else btn.classList.add("btnAdicionar");

          //adiciona os dados dos elementos
          img.src = item.img;
          img.alt = `Imagem do serviço ${item.nome}`;
          title.textContent = item.nome;
          subtitle.textContent = `${item.preco} • ${item.duracao}`;
          dt1.textContent = item.detailText1;
          dt2.textContent = item.detailText2;
          btn.textContent = btnText;
          if (listaAdicionais) {
            btnText = "Adicionar";
            btn.textContent = btnText;
          }
          produto.id = `produto-${item.id}`;
          if(isPromo){
            btn.setAttribute("data-id", `promo-${item.id}`)
            btn.setAttribute("data-includes", item.inclui)
        }else btn.setAttribute("data-id", `service-${item.id}`)
          

          

          //adiciona os filhos ao produto
          hdCard.append(title, subtitle);
          imgCard.append(img);
          dtCard.append(dt1, dt2);
          btnCard.appendChild(btn);
          container.append(hdCard, btnCard);
          if (isPromo) article.append(imgCard, container);
          else article.append(hdCard, dtCard, imgCard, btnCard);
          produto.append(article);

          
          if (isPromo && listaPromocoes) listaPromocoes.appendChild(produto);
          else if (listaServicos) listaServicos.appendChild(produto);
          if (!isPromo && listaAdicionais) listaAdicionais.appendChild(produto);
        });
      }

      btnEventListeners();
    });
}

function load() {
  listServices();
}

document.addEventListener("DOMContentLoaded", load);
