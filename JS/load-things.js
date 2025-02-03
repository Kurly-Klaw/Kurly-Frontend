
function loadThings() {
    //carrega os serviços e promoções

    fetch("JS/dados.json")
        .then((response) => response.json())
        .then((data) => {
            // Carrega promoções

            const promocoes = document.getElementById("promos")
            if (promocoes) {
                data.promos.forEach((promo) => {
                    const pai = document.createElement("figure");
                    const img = document.createElement("img");
                    const dpromo = document.createElement("figcaption");
                    const title = document.createElement("h3");
                    const subtitle = document.createElement("p");
                    const btn = document.createElement("button");

                    img.src = promo.img;
                    img.alt = `Imagem do serviço ${promo.nome}.`;
                    title.textContent = promo.titulo
                    subtitle.textContent = `R$ ${promo.preco} • ${promo.duracao}`
                    btn.textContent = "Agendar"

                    img.classList.add("promo-img", "w-full", "aspect-square", "object-cover")
                    dpromo.classList.add("d-promo")
                    subtitle.classList.add("pd-promo")

                    pai.id = `promo-card-${promo.id}`
                    btn.classList.add("btn-agendar")
                    btn.setAttribute("data-id", `promo-btn-${promo.id}`)

                    dpromo.append(title, subtitle)
                    pai.append(img, dpromo, btn)
                    promocoes.appendChild(pai);
                });
            }
            else {
                console.warn("Elemento com id 'promos' não foi encontrado na página.");
            }

            //Carrega demais serviços.
            const services = document.getElementById("lista-servicos")
            if (services) {
                data.servicos.forEach((serv) => {
                    const li = document.createElement("li");
                    const produto = document.createElement("article");
                    const img = document.createElement("img");
                    const cardhd = document.createElement("div");
                    const carddt = document.createElement("div");
                    const cardbtn = document.createElement("div");
                    const cardctt = document.createElement("div");
                    const cardimg = document.createElement("div");
                    const rotarr = document.createElement("div");
                    const svg = document.createElement("svg");
                    const path = document.createElement("path");
                    const title = document.createElement("h3");
                    const subtitle = document.createElement("p");
                    const dt1 = document.createElement("p");
                    const dt2 = document.createElement("p");

                    const btn = document.createElement("button");

                    produto.setAttribute("onclick", "toggleCard(event)")
                    produto.classList.add("relative", "cursor-pointer", "card", "h-[80px]")
                    li.classList.add("mb-2")
                    dt1.classList.add("font-semibold", "text-sm")
                    dt2.classList.add("text-sm")
                    cardhd.classList.add("absolute", "card-head", "mt-4")
                    carddt.classList.add("absolute", "card-detail")
                    cardctt.classList.add("absolute", "card-detail")
                    cardbtn.classList.add("flex", "items-start", "justify-end", "px-4", "pt-2")
                    cardimg.classList.add("flex", "aspect-square", "card-img", "pl-0")
                    img.classList.add("object-cover", "rounded-lg")
                    rotarr.classList.add("p-2", "rotate-btn", "h-fit")


                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
                    svg.setAttribute("height", "24px")
                    svg.setAttribute("width", "24px")
                    svg.setAttribute("viewBox", "0 -960 960 960")
                    svg.setAttribute("fill", "#FFFFFF")
                    svg.classList.add("h-4")
                    path.setAttribute("d", "M480-360 280-560h400L480-360Z")

                    img.src = serv.img;
                    img.alt = `Imagem do serviço ${serv.nome}.`;
                    title.textContent = serv.nome;
                    subtitle.textContent = `${serv.preco} • ${serv.duracao}`;
                    dt1.textContent = serv.detailText1;
                    dt2.textContent = serv.detailText2;
                    btn.textContent = "Agendar";


                    produto.id = `servico-card-${serv.id}`
                    btn.classList.add("btn-agendar")
                    btn.setAttribute("data-id", `${serv.id}`)

                    cardhd.append(title, subtitle)
                    carddt.append(dt1, dt2)
                    cardbtn.appendChild(btn)
                    cardimg.appendChild(img)
                    svg.appendChild(path)
                    rotarr.appendChild(svg)
                    produto.append(cardhd, svg, carddt, cardimg, cardbtn)
                    li.appendChild(produto)
                    services.appendChild(li);
                });
            }
            else {
                console.warn("Elemento com id 'lista-servicos' não foi encontrado na página.");
            }
            attachEventListeners()
        });


}






function loadServicoSelected() {


    fetch("JS/dados.json")
        .then((dados) => dados.json())
        .then((dado) => {

            const serviceId = localStorage.getItem('servicoSelecionado')
            const serviceImg = document.getElementById('service-image');
            
            const service = dado.servicos[serviceId-1];
            console.log(service)
            
            

            serviceImg.src = service.img;
            serviceImg.alt = `Imagem do serviço ${service.nome}`

            document.getElementById('service-title').textContent = service.nome;
            document.getElementById('service-price-duration').textContent = `${service.preco} • ${service.duracao}`;
            document.getElementById('service-description').textContent = service.detailText1 + service.detailText2;
        })
}




function load() {
    
    console.log("Oi")
    loadThings()
    loadServicoSelected()
}



document.addEventListener('DOMContentLoaded', load);
