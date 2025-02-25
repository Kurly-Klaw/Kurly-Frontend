import { getUser } from "../routes/UserRoutes.js";
import { getService } from "../assets/js/catchservices.js"
import { deleteRegister } from "../routes/RegisterRoutes.js"

let userschedules = await getUser(sessionStorage.getItem("user_id"))
userschedules = userschedules.current_schedule
const schedule = document.getElementById("user-schedules")
//console.log(userschedules)

if (userschedules.length > 0) {
    schedule.innerHTML = ""
    for (let i = 0; i < userschedules.length; i++) {
        //console.log(userschedules, userschedules[i])
        schedule.append(await createItem(userschedules[i].treatment, userschedules[i]))
    }
}

async function createItem(key, schedule) {
    let item = await getService(key);
    let status = schedule.status
    let date = schedule.date

    date = date.split('-').reverse().join('/');

    console.warn(item)
    //console.log("Criando item ", key, item);

    const produto = document.createElement("li");

    let subtitulo = `R$ $ {item.preco} • $ {item.duracao}`;

    produto.innerHTML = `
            <article class="produto schedule" id="${key}">
                <div class="imgCard">
                    <img src="${item.img}" alt="Imagem do serviço ${item.nome}">
                </div>

            <div class="hdCard">
                <h3 class="flex">${item.nome}</h3>
                <p class="font-inter">${date}</p>
                <p>${status = 'scheduled' ? 'Agendado' : 'Cancelado'}</p>
            </div>
            <div class="dtCard">
                <p>${item.detailText1}</p>
                <p>${item.detailText2}</p>
            </div>
            <div class='btnDiv'>
                <button class='btnEditar'>Editar</button>
                <button class='btnCancelar' onclick='cancelarHora(event)' data-id='${schedule.register_id}'>Cancelar</button>
            </div>
            </article>
        `;
    return produto;
}


window.cancelarHora = function (event) {
    let a = document.getElementById('cancelarPopup')
    let register_id = event.target.dataset.id

    a.show()
    let btnNao = document.querySelector('#btnNao')
    let btnC = document.querySelector('#btnC')
    btnC.addEventListener('click', () => {
        deleteRegister(register_id)
        a.close()
    })
    btnNao.addEventListener('click', () => {
        a.close()
    })
}