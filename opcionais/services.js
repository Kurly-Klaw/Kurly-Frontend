document.addEventListener("DOMContentLoaded", listServices);

import { getCart, updateCart } from './cart.js';
import { readJSON } from '../assets/js/catchservices.js';
import { rmvAdditionalSelection, addAdditionalSelection } from '../assets/js/sessionStorage.js';


const value = document.getElementById('cartPrices')
async function listServices() {
    const adictionList = document.getElementById("more-list");
    const carrinho = getCart();

    value.textContent = `R$ ${carrinho.total},00`
    let data = await readJSON()
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

        Object.keys(data.opcionais).forEach(key => {
            const item = data.opcionais[key];
            adictionList.append(createItem(key, item));
        });
    }
}

//Cria os itens que serão populados na tela
function createItem(key, item) {
//    console.warn("Criando item");
    const produto = document.createElement("li");
    const container = document.createElement("div");
    
    let btnText = "Adicionar";
    let subtitulo, classes, btnfuncao, funcao, btnclasse = "btnAgendar";

    let isIncluded = getCart().comboServiceKeys.indexOf(key) !== -1; //Retorna falso se key não estiver incluso em comboServiceKeys
    let isSelected = getCart().additionalSelection.indexOf(key) !== -1; //Retorna falso se key não estiver incluso em additionalSelection
    subtitulo = `+ R$ ${item.preco}`;

    //linha confusa, mas é 2 ifs em série: SE isIncluded ? então btnclasse = "classes" se não: isSelected? então = outras classes : se não = mais valores
    btnclasse = isIncluded ? "btnIncluido selected" : isSelected ? "btnAdicionar selected" : "btnAdicionar"
    btnText = isIncluded ? "Incluido" : isSelected ? "Adicionado" : btnText

    //Parecido com outra condição: Faz o botão ter ou não a função de ser adicionado, caso isIncluded
    btnfuncao = isIncluded ? "" : "onclick='btnAdditionalPressed(event)'";

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
            <button class="${btnclasse}" ${btnfuncao} data-id="${key}">${btnText}</button>
        </div>
        <div class="seta"> ▲</div>
    `;

    container.classList.add("txtcontainer");
    produto.querySelector("article").append(...container.childNodes);
    return produto;
}

//Seta valores de acordo com infos recebidas
function remap(infos) {
    document.getElementById("select-service-img").src = infos.img;
    document.getElementById("select-service-title").textContent = infos.title;
    document.getElementById("select-service-price").textContent = infos.price;
    document.getElementById("select-service-details").textContent = infos.details;
}


//declara funções utilizadas pelos cards da página
window.btnAdditionalPressed = async function (event) {
    const btn = event.currentTarget;
    const idSelected = btn.getAttribute("data-id");
    const carrinho = getCart();
    if (carrinho.comboServiceKeys.includes(idSelected)) {
        btn.classList.add("included");
        btn.textContent = "Incluido";
        return;
    }

    btn.classList.toggle("selected");

    if (btn.classList.contains("selected")) {
        btn.textContent = "Adicionado";
        addAdditionalSelection(idSelected)
    } else {
        btn.textContent = "Adicionar";
        rmvAdditionalSelection(idSelected)
    }
    updateCart(carrinho);
}

window.toggleCard = function (event) {
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