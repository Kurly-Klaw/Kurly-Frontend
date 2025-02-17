const listCart = sessionStorage.getItem("carrinho")

async function listServices() {
  
    //Definie quais serão os pais dos elementos
  const promoList = document.getElementById("promo-list");
  const servicesList = document.getElementById("services-list");
  const adictionList = document.getElementById("more-list");
  const serviceDiv = document.getElementById("select-service");
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));

  //pega os dados para popular
  fetch("./assets/js/dados.json")
    .then((file) => file.json())
    .then((data) => {
      //verifica se existem os elementos pai na página
      if (promoList || servicesList || adictionList) {


        Object.keys(data.items).forEach((key) => {

          //Constantes utilizadas para criar os itens
          const item = data.items[key];
          const isPromo = item.isPromo;
          let btnText = "Agendar";

          //Anexa os itens criados nas listas UL pai
          if (isPromo && promoList) promoList.appendChild(createItem(key, item, isPromo, btnText));
          if (!isPromo && servicesList) servicesList.append(createItem(key, item, isPromo, btnText));

        });
        Object.keys(data.acrescimos).forEach((key) => {
          //Constantes utilizadas para criar os itens
          const item = data.acrescimos[key];
          let btnText = "Adicionar";

          if (adictionList) adictionList.append(createItem(key, item, false, btnText, true))
        })

      }

      // btnEventListeners();
    });
}


function createItem(key, item, isPromo, btnText, adictionList = false) {

  //Constantes utilizadas para criar os itens
  const produto = document.createElement("li")
  const container = document.createElement("div")

  //Variaveis para os itens
  let subtitulo, classes, btnfuncao, funcao, btnclasse = "btnAgendar"
  let data_id, data_includes = ""
  //console.warn(item)

  //Modificando cada item a depender do contexto
  if (adictionList) //Se há lista de adicionais
  {
    subtitulo = `+ R$ ${item.preco}`;
    let isSelected = JSON.parse(listCart).additionalSelection.indexOf(key) != -1
    if(isSelected){ btnclasse = "btnAdicionar selected"
      btnText = "Adicionado"
    }
    else btnclasse = "btnAdicionar"
    btnfuncao = "onclick='btnAdditionalPressed(event)'"
  }
  else {
    subtitulo = `R$ ${item.preco} • ${item.duracao}`;
    btnfuncao = "onclick='btnProductPressed(event)'"}

  if (isPromo) { //Se item é Promoção
    if(item.inclui) {
      classes = "promo combo"
      data_includes = `data-includes='[${item.inclui}]'`
    }
      else classes = "promo"
    funcao = "onclick='slidePromo(event)'"
  }
  else {
    classes = "produto"
    funcao = "onclick='toggleCard(event)'"
  }

  //Estrutura do item
  produto.innerHTML =
    `<article class=${classes} id=${key} ${funcao}>
<div class="imgCard">
<img src="${item.img}" alt="Imagem do serviço ${item.nome}.">
</div>
</article>`

  //Estrutura do container dos detalhes do item
  container.innerHTML =
    `<div class="hdCard">
<h3>${item.nome}</h3>
<p>${subtitulo}</p>
</div>
<div class="dtCard">
<p>${item.detailText1}</p>
<p>${item.detailText2}</p>
</div>
<div class="btnCard">
<button class= '${btnclasse}' ${btnfuncao} ${data_includes} data-id="${key}">${btnText}</button>
</div>
<div class="seta"> ▲</div>`

  //Define classe pro container de detalhes
  container.classList.add("txtcontainer")

  //Verifica se é promo e então coloca OU o container inteiro OU apenas seu conteúdo
  if (isPromo) produto.querySelector("article").append(container)
  else produto.querySelector("article").append(...container.childNodes)

  return produto
}