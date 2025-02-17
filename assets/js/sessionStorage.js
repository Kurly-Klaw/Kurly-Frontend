let sessionCarrinho = JSON.parse(sessionStorage.getItem("carrinho"))
if (sessionCarrinho == null) setCarrinho()

function setCarrinho() {
    console.log("Uai")
    sessionStorage.setItem(
        "carrinho",
        JSON.stringify({
            selectedServiceKey: null,
            selectedServiceData: {},
            comboService: [],
            additionalSelection: [],
            total: 0,
            data: new Date().toISOString(),
        })
    )
    sessionCarrinho = JSON.parse(sessionStorage.getItem("carrinho"))
}

function getCarrinho() {
    return JSON.parse(sessionStorage.getItem("carrinho"))
}

function editCarrinho(i, dado) {
    switch (i) {
        case 'selectedKey':
            sessionCarrinho.selectedServiceKey = dado;
            break;

        case 'selectedData':
            sessionCarrinho.selectedServiceData = dado;
            break;

        case 'comboService':
            let opcionais = [];  // Lista de itens opcionais
            sessionCarrinho.comboService = []; // Garantir que comboService seja resetado

            // Loop para separar os opcionais e serviços principais
            for (let item of dado) {
                
                    sessionCarrinho.comboService.push(item);  // Adiciona item de comboService
                
            }

            sessionCarrinho.additionalSelection = opcionais;  // Atualiza a lista de opcionais
            break;

        case 'addSelection':
            sessionCarrinho.additionalSelection = dado;  // Atualiza adicionalSelection
            break;

        case 'cleanCombo':
            sessionCarrinho.comboService = [];  // Limpa o comboService
            break;
    }

    sessionCarrinho.data = new Date().toISOString();  // Atualiza a data do carrinho
    updateCart();  // Atualiza o carrinho na sessão
}


function updateCart() {
    sessionStorage.setItem('carrinho', JSON.stringify(sessionCarrinho));
}

function addAdditionalSelection(cart, dataId) {
    let index = cart.additionalSelection.indexOf(dataId);
    if (index == -1) cart.additionalSelection.push(dataId);
    updateCart()
}

function rmvAdditionalSelection(cart, dataId) {
    let index = cart.additionalSelection.indexOf(dataId);
    if (index != -1) cart.additionalSelection.splice(index, 1);
    updateCart()
}


function btnProductPressed(event) {
    const btn = event.currentTarget;
    const idSelected = btn.getAttribute("data-id")
    const includeSelected = btn.getAttribute("data-includes")
    //console.warn(`Agendando o pedido ${idSelected}`);
    editCarrinho("selectedKey", idSelected)
    if (includeSelected) editCarrinho("comboService", includeSelected.replace(/[\[\]]/g, "").split(","))
    else editCarrinho("cleanCombo")
    window.location.href = "./opcionais";
}
