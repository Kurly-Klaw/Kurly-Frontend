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
            sessionCarrinho.selectedServiceKey = dado
            break;
        case 'selectedData':
            sessionCarrinho.selectedServiceData = dado
            break;
        case 'comboService':
            let opicional = []
            for (let i = 0; i < dado.length; i++) {
                if (dado[i].charAt(0) == "o") {
                    
                    opicional[opicional.length] = dado[i]
                    dado.splice(i,1)
                } else{
                console.log(dado[i])
                    sessionCarrinho.comboService = dado}
            }
            sessionCarrinho.additionalSelection = opicional
            break;
        case 'addSelection':
            sessionCarrinho.additionalSelection = dado
            break;
    }
    sessionCarrinho.data = new Date().toISOString()
    updateCart()
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
    console.log(cart)
    let index = cart.additionalSelection.indexOf(dataId);
    if (index != -1) cart.additionalSelection.splice(index, 1);
    updateCart()
}


function btnProductPressed(event) {
    const btn = event.currentTarget;
    const idSelected = btn.getAttribute("data-id")
    const includeSelected = btn.getAttribute("data-includes")
    console.warn(`Agendando o pedido ${idSelected}`);
    editCarrinho("selectedKey", idSelected)
    if (includeSelected) editCarrinho("comboService", includeSelected.replace(/[\[\]]/g, "").split(","))
    else editCarrinho("comboService", [])
    window.location.href = "./opcionais";
}


function btnAdditionalPressed(event) {
    const btn = event.currentTarget;
    const idSelected = btn.getAttribute("data-id")

    //console.log("btnAdditionalPressed!", btn, sessionCarrinho)
    btn.classList.toggle("selected");
    if (btn.classList.contains("selected")) {
        btn.textContent = "Adicionado"
        addAdditionalSelection(sessionCarrinho, btn.dataset.id)
    } else {
        btn.textContent = "Adicionar"
        rmvAdditionalSelection(sessionCarrinho, btn.dataset.id)
    }
}



