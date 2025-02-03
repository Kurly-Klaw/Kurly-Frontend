function loadThings() {
  //carrega os serviços e promoções

  fetch("./JS/dados.json")
    .then((response) => response.json())
    .then((data) => {
      // Carrega promoções
      console.log("Processando as informações.");
      const listaPromocoes = document.getElementById("promos");
      const listaServicos = document.getElementById("lista-servicos");
      const listaAdicionais = document.getElementById("lista-adicionais");

      if (false) {z

      

        const li = document.createElement("li");

        const figure = document.createElement("figure");
        const article = document.createElement("article");

        const img = document.createElement("img");

        const carddt = document.createElement("div");

        const dt1 = document.createElement("p");
        const dt2 = document.createElement("p");

        const cardhd = document.createElement("div");

        const title = document.createElement("h3");
        const subtitle = document.createElement("p");

        const cardbtn = document.createElement("div");

        const btn = document.createElement("button");

        const cardimg = document.createElement("div");

        let txtBtn = "Agendar";
        let txtClass = "btn-agendar"


        if (false) {
          Object.keys(data.promos).forEach((key) => {
            const promo = data.promos[key];
            
            img.src = promo.img;
            img.alt = `Imagem do serviço ${promo.nome}.`;
            title.textContent = promo.titulo;
            subtitle.textContent = `R$ ${promo.preco} • ${promo.duracao}`;
            btn.textContent = txtBtn;

          })
        }
        if (false) {
          Object.keys(data.servicos).forEach((key) => {
            const serv = data.servicos[key];
            img.src = serv.img;
            img.alt = `Imagem do serviço ${serv.nome}.`;
            title.textContent = serv.titulo;
            subtitle.textContent = `R$ ${serv.preco} • ${serv.duracao}`;
            if (false) { //SE tiver na lista de adicionais
              txtBtn = "Adicionar";

            }
            btn.textContent = txtBtn
            btn.classList.add(txtClass);
            btn.setAttribute("data-id", `promo-${serv.id}`);

          })
        }
      }

      if (listaPromocoes) {
        Object.keys(data.promos).forEach((key) => {
          const promo = data.promos[key];

          const pai = document.createElement("figure");
          const img = document.createElement("img");
          const dpromo = document.createElement("figcaption");
          const title = document.createElement("h3");
          const subtitle = document.createElement("p");
          const btn = document.createElement("button");
          const promoB = document.createElement("div"); 

          img.src = promo.img;
          img.alt = `Imagem do serviço ${promo.nome}.`;
          title.textContent = promo.titulo;
          subtitle.textContent = `R$ ${promo.preco} • ${promo.duracao}`;
          btn.textContent = "Agendar";
          //dpromo.classList.add("flex","justify-between","flex-row")

          img.classList.add(
            "promo-img",
            "w-full",
            "aspect-square",
            "object-cover"
          );
          dpromo.classList.add("d-promo");
          subtitle.classList.add("pd-promo");

          pai.id = `promo-card-${promo.id}`;
          btn.classList.add("btn-agendar","btn-promo");
          promoB.classList.add("flex","justify-end")
          btn.setAttribute("data-id", `promo-${promo.id}`);

          dpromo.append(title, subtitle);
          promoB.append(btn)
          pai.append(img,dpromo,promoB);
          listaPromocoes.appendChild(pai);
        });
      } else {
        console.warn("Elemento com id 'promos' não foi encontrado na página.");
      }

      //Carrega demais serviços.


      if (listaServicos) {
        Object.keys(data.servicos).forEach((key) => {
          const serv = data.servicos[key];
          const li = document.createElement("li");
          const produto = document.createElement("article");
          const img = document.createElement("img");
          const cardhd = document.createElement("div");
          const carddt = document.createElement("div");
          const cardbtn = document.createElement("div");
          const cardctt = document.createElement("div");
          const cardimg = document.createElement("div");
          const title = document.createElement("h3");
          const subtitle = document.createElement("p");
          const dt1 = document.createElement("p");
          const dt2 = document.createElement("p");

          const btn = document.createElement("button");

          produto.setAttribute("onclick", "toggleCard(event)");
          produto.classList.add(
            "relative",
            "cursor-pointer",
            "card",
            "h-[80px]"
          );
          li.classList.add("mb-2");
          dt1.classList.add("font-semibold", "text-sm");
          dt2.classList.add("text-sm");
          cardhd.classList.add("absolute", "card-head", "mt-4");
          carddt.classList.add("absolute", "card-detail");
          cardbtn.classList.add(
            "flex",
            "items-start",
            "justify-end",
            "px-4",
            "pt-2"
          );
          cardimg.classList.add("flex", "aspect-square", "card-img", "pl-0");
          img.classList.add("object-cover", "rounded-lg");

          img.src = serv.img;
          img.alt = `Imagem do serviço ${serv.nome}.`;
          title.textContent = serv.nome;
          subtitle.textContent = `${serv.preco} • ${serv.duracao}`;
          dt1.textContent = serv.detailText1;
          dt2.textContent = serv.detailText2;
          btn.textContent = "Agendar";

          produto.id = `servico-card-${serv.id}`;
          btn.classList.add("btn-agendar");
          btn.setAttribute("data-id", `servico-${serv.id}`);
          cardhd.append(title, subtitle);
          carddt.append(dt1, dt2);
          cardbtn.appendChild(btn);
          cardimg.appendChild(img);
          produto.append(cardhd, carddt, cardimg, cardbtn);
          li.appendChild(produto);
          listaServicos.appendChild(li);
        });
      } else {
        console.warn(
          "Elemento com id 'lista-servicos' não foi encontrado na página."
        );
      }

      if (listaAdicionais) {
        Object.keys(data.servicos).forEach((key) => {
          const serv = data.servicos[key];
          const li = document.createElement("li");
          const produto = document.createElement("article");
          const img = document.createElement("img");
          const cardhd = document.createElement("div");
          const carddt = document.createElement("div");
          const cardbtn = document.createElement("div");
          const cardctt = document.createElement("div");
          const cardimg = document.createElement("div");
          const title = document.createElement("h3");
          const subtitle = document.createElement("p");
          const dt1 = document.createElement("p");
          const dt2 = document.createElement("p");

          const btn = document.createElement("button");

          produto.setAttribute("onclick", "toggleCard(event)");
          produto.classList.add(
            "relative",
            "cursor-pointer",
            "card",
            "h-[80px]"
          );
          li.classList.add("mb-2");
          dt1.classList.add("font-semibold", "text-sm");
          dt2.classList.add("text-sm");
          cardhd.classList.add("absolute", "card-head", "mt-4");
          carddt.classList.add("absolute", "card-detail");
          cardbtn.classList.add(
            "flex",
            "items-start",
            "justify-end",
            "px-4",
            "pt-2"
          );
          cardimg.classList.add("flex", "aspect-square", "card-img", "pl-0");
          img.classList.add("object-cover", "rounded-lg");

          img.src = serv.img;
          img.alt = `Imagem do serviço ${serv.nome}.`;
          title.textContent = serv.nome;
          subtitle.textContent = `${serv.preco} • ${serv.duracao}`;
          dt1.textContent = serv.detailText1;
          dt2.textContent = serv.detailText2;
          btn.textContent = "Adicionar";
          btn.classList.add("btn-adicionar");

          produto.id = `servico-card-${serv.id}`;

          btn.setAttribute("data-id", `servico-${serv.id}`);
          cardhd.append(title, subtitle);
          carddt.append(dt1, dt2);
          cardbtn.appendChild(btn);
          cardimg.appendChild(img);
          produto.append(cardhd, carddt, cardimg, cardbtn);
          li.appendChild(produto);
          listaAdicionais.appendChild(li);
        });
      } else {
        console.warn(
          "Elemento com id 'lista-servicos' não foi encontrado na página."
        );
      }

      attachEventListeners();
    });
}

function loadServicoSelected() {
  fetch("./JS/dados.json")
    .then((dados) => dados.json())
    .then((dado) => {
      const serviceDiv = document.getElementById("servico-selecionado");

      if (serviceDiv) {
        const serviceId = localStorage.getItem("servicoSelecionado");
        const service = dado.servicos[serviceId];
        console.log(serviceId);
        const serviceImg = document.getElementById("service-image");

        console.log(service);

        serviceImg.src = service.img;
        serviceImg.classList.add("h-[80px]")
        serviceImg.alt = `Imagem do serviço ${service.nome}`;

        document.getElementById("service-title").textContent = service.nome;
        document.getElementById(
          "service-price-duration"
        ).textContent = `${service.preco} • ${service.duracao}`;

        document.getElementById("service-descriptions").textContent =
          service.detailText1 + " " + service.detailText2;
      } else {
        console.warn(
          "Elemento com id'servico-selecionado' não foi encontrado na página."
        );
      }
    });
}

function load() {
  console.log("Oi");
  loadThings();
  loadServicoSelected();
}

document.addEventListener("DOMContentLoaded", load);

