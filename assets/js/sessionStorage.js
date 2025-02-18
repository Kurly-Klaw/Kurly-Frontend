import { getService } from "./catchservices.js"

let carrinho = JSON.parse(sessionStorage.getItem("carrinho"))
if (carrinho == null) setCarrinho()

export function setCarrinho() {
    sessionStorage.setItem(
        "carrinho",
        JSON.stringify({
            selectedServiceKey: null,
            selectedServicesData: [],
            comboServiceKeys: [],
            additionalSelection: [],
            total: 0,
        })
    )
    carrinho = JSON.parse(sessionStorage.getItem("carrinho"))
}

export function getCarrinho() {
    if (!sessionStorage.getItem("carrinho")) setCarrinho()
    return JSON.parse(sessionStorage.getItem("carrinho"))
}

export async function editCarrinho(i, dado = {}) {
    switch (i) {
        case 'selectedKey':
            editCarrinho("cleanSelectedServicesData")
            carrinho.selectedServiceKey = dado;
            if (dado.startsWith('s')) carrinho.selectedServicesData = [await getService(dado)];
            break;

        case 'selectedData':
            carrinho.selectedServiceData = dado;
            break;

        case 'comboService':
            editCarrinho("cleanCombo") // Garantir que comboService seja resetado

            // Loop para separar os opcionais e serviços principais
            for (let item of dado) {
                carrinho.comboServiceKeys.push(item);  // Adiciona item de comboService                
                carrinho.selectedServicesData.push(await getService(item))
            }
            break;

        case 'addSelection':
            carrinho.additionalSelection = dado;  // Atualiza adicionalSelection
            break;

        case 'cleanCombo':
            carrinho.comboServiceKeys = [];  // Limpa o comboService
            break;
        case 'cleanSelectedServicesData':
            carrinho.selectedServicesData = [];  // Limpa o comboService
            break;
        case 'cleanadditional':
            carrinho.additionalSelection = [];  // Limpa o comboService
            break;
    }

    updateCart();  // Atualiza o carrinho na sessão
}


export function updateCart() {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

export function addAdditionalSelection(cart, dataId) {
    let index = cart.additionalSelection.indexOf(dataId);
    if (index == -1) cart.additionalSelection.push(dataId);
    updateCart()
}

export function rmvAdditionalSelection(cart, dataId) {
    let index = cart.additionalSelection.indexOf(dataId);
    if (index != -1) cart.additionalSelection.splice(index, 1);
    updateCart()
}

