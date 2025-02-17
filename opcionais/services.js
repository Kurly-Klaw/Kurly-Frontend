// services.js
import { getCart, updateCart } from './cart.js';

document.addEventListener("DOMContentLoaded", listServices);

async function listServices() {
    const adictionList = document.getElementById("more-list");
    const serviceDiv = document.getElementById("select-service");
    const carrinho = getCart();

    fetch("../assets/js/dados.json")
        .then(response => response.json())
        .then(data => {
            if (adictionList) {
                Object.keys(data.items).forEach(key => {
                    if (carrinho.selectedServiceKey === key) {
                        let infos = {
                            img: data.items[key].img,
                            title: data.items[key].nome,
                            price: data.items[key].preco,
                            details: data.items[key].detailText1,
                        };
                        remap(infos);
                    }
                });

                Object.keys(data.acrescimos).forEach(key => {
                    const item = data.acrescimos[key];
                    let btnText = "Adicionar";
                    adictionList.append(createItem(key, item, false, btnText, true));
                });
            }
        });
}

function createItem(key, item, isPromo, btnText, adictionList = false) {
    console.warn("Criando item");
    const produto = document.createElement("li");
    const container = document.createElement("div");

    let subtitulo, classes, btnfuncao, funcao, btnclasse = "btnAgendar";
    let data_id, data_includes = "";

    let isSelected = getCart().comboService.indexOf(key) !== -1;
    subtitulo = `+ R$ ${item.preco}`;
    btnclasse = isSelected ? "btnIncluido selected" : "btnAdicionar";
    btnText = isSelected ? "Incluido" : btnText;
    btnfuncao = isSelected ? "" : "onclick='btnAdditionalPressed(event)'";

    classes = "produto";
    funcao = "onclick='toggleCard(event)'";

    produto.innerHTML = `
        <article class="${classes}" id="${key}" ${funcao}>
            <div class="imgCard">
                <img src="${item.img}" alt="Imagem do serviço ${item.nome}">
                <div class="dtCard">
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

function remap(infos) {
    document.getElementById("select-service-img").src = infos.img;
    document.getElementById("select-service-title").textContent = infos.title;
    document.getElementById("select-service-price").textContent = infos.price;
    document.getElementById("select-service-details").textContent = infos.details;
}

window.btnAdditionalPressed = async function(event) {
    const btn = event.currentTarget;
    const idSelected = btn.getAttribute("data-id");
    const carrinho = getCart();

    if (carrinho.comboService.includes(idSelected)) {
        btn.classList.add("included");
        btn.textContent = "Incluído";
        return;
    }

    btn.classList.toggle("selected");
    if (btn.classList.contains("selected")) {
        btn.textContent = "Adicionado";
        let index = carrinho.additionalSelection.indexOf(idSelected);
        if (index == -1) carrinho.additionalSelection.push(idSelected);
    } else {
        btn.textContent = "Adicionar";
        let index = carrinho.additionalSelection.indexOf(idSelected);
        if (index != -1) carrinho.additionalSelection.splice(index, 1);
    }

    updateCart(carrinho);
}

window.toggleCard = function(event) {
    const card = event.currentTarget;
    const isButton = event.target.closest('button');
    const seta = card.getElementsByClassName("seta")[0];

    if (!isButton) {
        card.classList.toggle('expanded');
        seta.classList.toggle("invertido");
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}