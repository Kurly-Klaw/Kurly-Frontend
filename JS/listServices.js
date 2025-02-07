function listServices() {
  //Definie quais serão os pais dos elementos
  const promoList = document.getElementById("promo-list");
  const servicesList = document.getElementById("services-list");
  const moreList = document.getElementById("more-list");
  const comboList = document.getElementById("combo-list");
  const serviceDiv = document.getElementById("select-service");
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));

  //pega os dados para popular
  fetch("./JS/dados.json")
    .then((file) => file.json())
    .then((data) => {
      //verifica se existem os elementos pai na página
      if (promoList || servicesList || moreList) {
        let btnText = "Agendar";

        Object.keys(data.items).forEach((key) => {
          const item = data.items[key];
          const isPromo = item.isPromo;
          const teste = document.createElement("li")
          
          let subtitulo 
          if (moreList)
            subtitulo  = `+ R$ ${item.preco} • ${item.duracao}`;
          else subtitulo  = `R$ ${item.preco} • ${item.duracao}`;
          let data_id,data_includes
          if(isPromo){
            data_id = `promo-${item.id}`
            data_includes = `[${item.inclui}]`
            
          }else {data_id = `service-${item.id}`
          data_includes = data_id
        }
          teste.innerHTML =

            `
        <li>
        <article>
        <div class="imgCard">
        <img src="${item.img}" alt="Imagem do serviço ${item.nome}.">
        </div>
        <div class="hdCard">
        <h3>${item.nome}</h3>
        <p>${subtitulo}</p>
        </div>
        <div class="dtCard">
        <p>${item.detailText1}</p>
        <p>${item.detailText2}</p>
        </div>
        <div class="btnCard">
        <button data-id=""></button>
        </div>
        </article>
        </li>
       `



          
          

          const seta = document.createElement("div");
          seta.innerHTML = "▲";
          seta.classList.add("seta");
          const hr = document.createElement("hr")
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
          const resume = document.createElement("div");

          //adiciona classes aos elementos

          if (isPromo) article.classList.add("promo");
          else {
            article.classList.add("produto");
            article.setAttribute("onclick", "toggleCard(event)");
          }
          img.classList.add("imgProduto");
          imgCard.classList.add("imgCard");
          if (isPromo) imgCard.setAttribute("onclick", "slidePromo(event)");
          hdCard.classList.add("hdCard");
          dtCard.classList.add("dtCard");
          container.classList.add("flex", "flex-row");
          if (isPromo) btnCard.classList.add("btnCard", "btnPromo");
          else btnCard.classList.add("btnCard");
          if (!moreList) btn.classList.add("btnAgendar");
          else {
            btn.classList.add("btnAdicionar");
            btn.setAttribute("onclick", "setSelected(event)");
          }

          //adiciona os dados dos elementos
          img.src = item.img;
          img.alt = `Imagem do serviço ${item.nome}`;
          title.textContent = item.nome;
          if (moreList)
            subtitle.textContent = `+ R$ ${item.preco} • ${item.duracao}`;
          else subtitle.textContent = `R$ ${item.preco} • ${item.duracao}`;
          dt1.textContent = item.detailText1;
          dt2.textContent = item.detailText2;
          btn.textContent = btnText;
          if (moreList) {
            btnText = "Adicionar";
            btn.textContent = btnText;
          }
          produto.id = `produto-${item.id}`;
          if (isPromo) {
            btn.setAttribute("data-id", `promo-${item.id}`);
            btn.setAttribute("data-includes", `[${item.inclui}]`);
          } else {
            btn.setAttribute("data-id", `service-${item.id}`);
            btn.setAttribute("data-includes", btn.getAttribute("data-id"));
          }

          //adiciona os filhos ao produto
          hdCard.append(title, subtitle);
          imgCard.append(img);
          dtCard.append(dt1, dt2);
          btnCard.appendChild(btn);
          container.append(hdCard, btnCard);
          if (isPromo) article.append(imgCard, container);
          else article.append(hdCard, dtCard, imgCard, btnCard, seta);
          produto.append(article);

          if (serviceDiv && carrinho.servicoSelecionado === key) {
            document.getElementById("select-service-img").src = item.img;
            document.getElementById("select-service-title").textContent =
              title.textContent;
            document.getElementById("select-service-price").textContent =
              subtitle.textContent;
            document.getElementById("select-service-details").textContent =
              dt1.textContent;
          }
          if (serviceDiv) {
            if (carrinho.adicionais.indexOf(key) != -1) {
              console.error(carrinho);
              btn.classList.add("included");
              produto.classList.add("included")
              btn.textContent = "Já incluso";
              btn.disabled = true;
            }
            if (carrinho.selection.indexOf(key) != -1) {
              btn.classList.add("selected");
              btn.textContent = "Adicionado";
            }
          }

          if (isPromo && promoList) promoList.appendChild(produto);
          else if (servicesList) servicesList.appendChild(produto);
          if (!isPromo && moreList) {

             moreList.appendChild(produto);
          }

        });
      }

      btnEventListeners();
    });
}


