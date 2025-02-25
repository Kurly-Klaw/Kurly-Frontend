//Faz rodar após o carregamento da página
document.addEventListener("DOMContentLoaded", listServices);

//Importa funções repetitivas
import { createItem } from "../assets/js/createitem.js"
import { getServices } from "../assets/js/catchservices.js"


const promoList = document.getElementById("promo-list");
const servicesList = document.getElementById("services-list");


async function listServices() {
    
    try {
        if (promoList || servicesList) {
            console.log("Populando listas de serviços...");
            const data = await getServices("items");
            Object.entries(data).forEach(([key, item]) => {
                const isPromo = item.isPromo;
                if (isPromo && promoList)
                    promoList.appendChild(createItem(key, item, isPromo));
                if (!isPromo && servicesList)
                    servicesList.appendChild(createItem(key, item));
            });
        }
    } catch (error) {
        console.error("Erro ao carregar serviços:", error);
    }
}