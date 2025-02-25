import { getService } from "./catchservices.js"

let carrinho = JSON.parse(sessionStorage.getItem("carrinho"))
if (carrinho == null) setCarrinho()

export function setCarrinho() {
    sessionStorage.setItem(
        "carrinho",
        JSON.stringify({
            selectedServiceKey: null,
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

export async function setSelectedService(dado) {
    carrinho.comboServiceKeys = []
    carrinho.additionalSelection = []
    carrinho.selectedServiceKey = dado
    let temp = await getService(dado)
    if (dado.startsWith('c'))
        for (let item of temp.inclui) {
            carrinho.comboServiceKeys.push(item);  // Adiciona item de comboService                
        }

    carrinho.total = temp.preco

    updateCart();  // Atualiza o carrinho na sessão
}


export async function addAdditionalSelection(dataId) {
    let index = carrinho.additionalSelection.indexOf(dataId);
    let temp = await getService(dataId)
    if (index == -1) {
        carrinho.additionalSelection.push(dataId);
        carrinho.total += temp.preco

    }

    updateCart()
}

export async function rmvAdditionalSelection(dataId) {
    let index = carrinho.additionalSelection.indexOf(dataId);
    let temp = await getService(dataId)
    if (index != -1) {
        carrinho.additionalSelection.splice(index, 1);
        carrinho.total -= temp.preco
    }

    updateCart()
}

export function updateCart() {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}