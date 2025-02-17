// Obtém os itens do carrinho da sessionStorage
const listCart = sessionStorage.getItem("carrinho");
console.log(listCart);

document.addEventListener("DOMContentLoaded", listServices);

async function listServices() {
    const promoList = document.getElementById("promo-list");
    const servicesList = document.getElementById("services-list");
    const adictionList = document.getElementById("more-list");
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    try {
        const response = await fetch("./assets/js/dados.json");
        const data = await response.json();

        if (promoList || servicesList) {
            console.log("Populando listas de serviços...");

            Object.entries(data.items).forEach(([key, item]) => {
                const isPromo = item.isPromo;
                const btnText = "Agendar";
                if (isPromo && promoList) promoList.appendChild(createItem(key, item, isPromo, btnText));
                if (!isPromo && servicesList) servicesList.appendChild(createItem(key, item, isPromo, btnText));
            });

            Object.entries(data.acrescimos).forEach(([key, item]) => {
                const btnText = "Adicionar";
                if (adictionList) adictionList.appendChild(createItem(key, item, false, btnText, true));
            });
        }
    } catch (error) {
        console.error("Erro ao carregar serviços:", error);
    }
}

function createItem(key, item, isPromo, btnText, adictionList = false) {
    console.log("Criando item");
    const produto = document.createElement("li");
    const container = document.createElement("div");

    let subtitulo = adictionList ? `+ R$ ${item.preco}` : `R$ ${item.preco} • ${item.duracao}`;
    let btnclasse = "btnAgendar";
    let btnfuncao = adictionList ? "onclick='btnAdditionalPressed(event)'" : "onclick='btnProductPressed(event)'";
    let data_includes = "";

    if (adictionList) {
        const isSelected = JSON.parse(listCart).additionalSelection.includes(key);
        btnclasse = isSelected ? "btnAdicionar selected" : "btnAdicionar";
        btnText = isSelected ? "Adicionado" : btnText;
    }

    const classes = isPromo ? (item.inclui ? "promo combo" : "promo") : "produto";
    const funcao = isPromo ? "onclick='slidePromo(event)'" : "onclick='toggleCard(event)'";
    if (item.inclui) data_includes = `data-includes='[${item.inclui}]'`;

    produto.innerHTML = `
        <article class="${classes}" id="${key}" ${funcao}>
            <div class="imgCard">
                <img src="${item.img}" alt="Imagem do serviço ${item.nome}">
                <div class="dtCard hidden">
                    <p>${item.detailText1}</p>
                    <p>${item.detailText2}</p>
                </div>
            </div>
        </article>
    `;

    container.innerHTML = `
        <div class="hdCard">
            <h3>${item.nome}</h3>
            <p>${subtitulo}</p>
        </div>
        <div class="btnCard">
            <button class="${btnclasse}" ${btnfuncao} ${data_includes} data-id="${key}">${btnText}</button>
        </div>
        <div class="seta"> ▲</div>
    `;

    container.classList.add("txtcontainer");
    isPromo ? produto.querySelector("article").append(container) : produto.querySelector("article").append(...container.childNodes);
    return produto;
}
