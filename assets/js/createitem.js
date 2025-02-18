export function createItem(key="Vazio", item={}, isPromo = false, btnText = "Agendar", adictionList = false) {
    console.log("Criando item");
    
    const produto = document.createElement("li");
    const container = document.createElement("div");
    
    let subtitulo = adictionList ? `+ R$ ${item.preco}` : `R$ ${item.preco} • ${item.duracao}`;
    let btnclasse = "btnAgendar";

    let btnfuncao = adictionList ? "onclick='btnAdditionalPressed(event)'" : "onclick='btnProductPressed(event)'";
    let data_includes = "";



    if (adictionList) {
        const isSelected = JSON.parse(carrinho).additionalSelection.includes(key);
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
        <div class="seta">▲</div>
    `;

    container.classList.add("txtcontainer");
    isPromo ? produto.querySelector("article").append(container) : produto.querySelector("article").append(...container.childNodes);
    return produto;
}
