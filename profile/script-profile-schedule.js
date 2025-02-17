import { getUser } from "../routes/UserRoutes.js";
let userschedules = await getUser(sessionStorage.getItem("user_id"))
userschedules = userschedules.current_schedule
const schedule = document.getElementById("user-schedules")
console.log(userschedules)

if (userschedules.length > 0) {
    schedule.innerHTML = ""
    for (let i = 0; i < userschedules.length; i++) {
        console.log(userschedules, userschedules[i])
        schedule.append(createItem(userschedules[i].treatment, userschedules[i].date, userschedules[i].status))
    }
}

function createItem(key, date, status) {
    console.log("Criando item");

    const produto = document.createElement("li");

    let subtitulo = `R$ $ {item.preco} • $ {item.duracao}`;

    produto.innerHTML = `
            <article class="produto selected" id="${key}">
                <div class="imgCard">
                    <img src="$ {item.img}" alt="Imagem do serviço $ {item.nome}">
                </div>

            <div class="hdCard">
                <h3>${key}</h3>
                <p>${date}</p>
                <p>${status}</p>
            </div>
            <div class="dtCard">
                <p>$ {item.detailText1}</p>
                <p>$ {item.detailText2}</p>
            </div>
            </article>
        `;
    return produto;
}