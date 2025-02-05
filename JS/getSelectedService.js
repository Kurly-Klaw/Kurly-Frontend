function getService() {
  const service = localStorage.getItem("carrinho");
  const serviceId = service.Id;
  const serviceAdd = service.adicionais;
  console.log(service, serviceId, serviceAdd)

  const serviceDiv = document.getElementById("servico-selecionado");
    
  if (serviceDiv) {

    const img = document.createElement("img");
    const container = document.createElement("div");
    const dtCard = document.createElement("div");
    const hdCard = document.createElement("div");
    const imgCard = document.createElement("div");
    const title = document.createElement("h3");
    const subtitle = document.createElement("p");
    const dt1 = document.createElement("p");
    const dt2 = document.createElement("p");
    const resume = document.createElement("p");


    title.textContent = service.servicoSelecionado
    serviceDiv.append(title)

  } else {
    console.warn(
      "Elemento com id'servico-selecionado' não foi encontrado na página."
    );
  }
}

document.addEventListener('DOMContentLoaded',getService)
