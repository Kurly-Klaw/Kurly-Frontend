function getService() {
  const service = JSON.parse(localStorage.getItem("carrinho"));
  const serviceKey = service.servicoSelecionado;
  const serviceAdd = service.adicionais;
  console.log(service, serviceKey, serviceAdd)

  const serviceDiv = document.getElementById("servico-selecionado");

  if (serviceDiv) {

    const container = document.createElement("div");
    const imgCard = document.createElement("div");
    const img = document.createElement("img");    
    const dtCard = document.createElement("div");
    const hdCard = document.createElement("div");
    const title = document.createElement("h3");
    const subtitle = document.createElement("p");
    const dt1 = document.createElement("p");
    const dt2 = document.createElement("p");
    const resume = document.createElement("p");

    fetch("./JS/dados.json")
      .then((file) => file.json())
      .then((data) => {
        serviceData = data.items[serviceKey];
        title.textContent = `${serviceData.nome} — ${serviceData.titulo}`;
        subtitle.textContent = `R$ ${serviceData.preco} • ${serviceData.duracao}`;
        img.src = serviceData.img;
        img.alt = `Imagem referente ao serviço ${serviceData.nome}`;
        dt1.textContent = serviceData.detailText1;
        dt2.textContent = serviceData.detailText2;
      })

    container.classList.add("selected-card")
    imgCard.classList.add("selected-imgCard")
    img.classList.add("imgProduto")
    hdCard.classList.add("hd-card")
    dtCard.classList.add("dt-card")

    imgCard.append(img)
    hdCard.append(title, subtitle)
    dtCard.append(dt1, dt2)
    container.append(hdCard, dtCard)
    serviceDiv.append(imgCard,container)



  } else {
    console.warn(
      "Elemento com id'servico-selecionado' não foi encontrado na página."
    );
  }
}

document.addEventListener('DOMContentLoaded', getService)
