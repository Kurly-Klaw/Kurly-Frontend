import { listarDiasDoMes } from "./script-date.js";
import { createRegister } from "../routes/RegisterRoutes.js";
listarDiasDoMes()

let carrinho = JSON.parse(sessionStorage.getItem("carrinho"))



export function selectSchedule(date,data, start, end) {
    carrinho.date = date
    carrinho.data = data
    carrinho.schedule = {
        "start_hour": start,
        "end_hour": end
    };
    console.log(carrinho)
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

