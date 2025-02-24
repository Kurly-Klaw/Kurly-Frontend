import { getSchedule } from "../routes/ScheduleRoutes.js";
import { getRegister, createRegister, updateRegister, updateRegisterStatus, deleteRegister } from "../routes/RegisterRoutes.js";

// Constantes e configurações
const mesesDoAno = {
    0: "Janeiro", 1: "Fevereiro", 2: "Março", 3: "Abril", 4: "Maio", 5: "Junho",
    6: "Julho", 7: "Agosto", 8: "Setembro", 9: "Outubro", 10: "Novembro", 11: "Dezembro"
};

const dataAtual = new Date();
const hoje = dataAtual.getDate();
const ano = dataAtual.getFullYear();
const mes = dataAtual.getMonth(); // 0 = Janeiro, 11 = Dezembro
const ultimoDia = new Date(ano, mes + 1, 0).getDate(); // Último dia do mês
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Domingo a Sábado

// Elementos do DOM

const daysContainer = document.getElementById('days-container');
const numeroDoDia = document.getElementById('numero-do-dia');
const nomeDoMes = document.getElementById('mes-atual');
const nomeDoMes3 = document.getElementById('mes-atual-3');
const timeContainer = document.getElementById('time-container');
const monthInput = document.getElementById("mes-atual")

monthInput.value = `${ano}-0${mes + 1}`
monthInput.addEventListener("change", function () {
    const valorSelecionado = this.value; // Obtém o valor do input
    getDaysOnMonth(valorSelecionado); // Chama a função e passa o valor
});

listarDiasDoMes()

// Funções principais
function getDaysOnMonth(date) {
    console.log(date)
}





function listarDiasDoMes() {
    const dias = Array.from({ length: ultimoDia - hoje + 1 }, (_, i) => hoje + i);
    addDay(dias);
    atualizaHoras();
}

function addDay(arr) {
    daysContainer.innerHTML = ''
    numeroDoDia.textContent = hoje;
    nomeDoMes.textContent = mesesDoAno[mes];
    nomeDoMes3.textContent = mesesDoAno[mes].toUpperCase().slice(0, 3);

    arr.forEach(dia => {
        const dayElement = document.createElement('label');
        dayElement.className = 'flex flex-col items-center cursor-pointer flex-shrink-0';
        dayElement.innerHTML = `
            <input type="radio" name="day" class="day-radio font-inter" ${dia === hoje ? 'checked' : ''}>
            <p class="text-sm font-medium mb-1">${weekDays[getDayWeek(dia)]}</p>
            <div class="day-number aspect-square w-7 border-black border rounded-full flex items-center justify-center">
                <p class="text-base text-black font-semibold font-inter">${dia}</p>
                
            </div>
        `;

        const radioInput = dayElement.querySelector('input');
        radioInput.addEventListener('change', () => {
            if (radioInput.checked) {
                numeroDoDia.textContent = dia;
                atualizaHoras();
            }
        });

        daysContainer.appendChild(dayElement);
    });
}

function getDayWeek(day) {
    const diaSemana = dataAtual.getDay(); // Obtém o índice do dia atual (0-6)
    return (diaSemana + day - 1) % 7; // Calcula o índice do dia da semana
}

async function listarHorasDia(data) {
    if (data === null) {
        document.getElementById('noSchedulesAlert').classList.remove('hidden')

    }
    else {
        timeContainer.replaceChildren(); // Limpa o container antes de adicionar novos elementos
        let arr = data.schedules
        const Registers = await retriveRegister(data)
        arr.forEach(horario => {
            let registerEx = false
            let foundedRegister
            if (Registers) {
                Registers.forEach(register => {
                    if (register.schedule.start_hour == horario.start_hour && register.schedule.end_hour == horario.end_hour) {
                        registerEx = true
                        foundedRegister = register
                    }
                })
            }
            if (registerEx) {
                setScheduleRegisterData(horario, foundedRegister)
            } else {
                setNormalScheduleData(horario)
            }

        });

    }
}

function setScheduleRegisterData(horario, data) {
    //console.log(data)
    const timeArticle = document.createElement('article');
    timeArticle.className = 'scheduleCard p-4 gap-2 rounded-xl flex flex-col transition-colors';
    timeArticle.style.backgroundColor = '#EFEFEF';
    timeArticle.style.borderColor = '#EFEFEF';

    timeArticle.innerHTML = `
<div class="flex items-start justify-between ">
    <div class="flex gap-2 h-fit">
        <div class="h-12 aspect-square"><img class="h-full aspect-square"></div>
        <div class="flex flex-col h-fit">
        <p class="font-semibold text-base">${horario.is_scheduled ? `${data.name}` : "Horário livre"}</p>
        <p class="text-base">${data ? data.phone_number : ""}</p>
        </div>
    </div>
    <div class="flex items-center gap-1">
        <i class="material-icons text-[19px] leading-none">today</i>
        <p class="font-[inter] text-[#49454F]">${horario.start_hour}h – ${horario.end_hour}h</p>
    </div>
</div>
<div class="w-full h-fit flex justify-end gap-2">
    <button class="btn-admin-agenda-cancelar py-2 px-4 flex items-center text-sm gap-1 space-x-2 ">
<span class="material-symbols-outlined">close</span>
Cancelar
</button>

<button class="btn-admin-agenda-confirmar py-2 px-4 flex items-center text-sm gap-1 space-x-2 ">
<span class="material-symbols-outlined text-white">check</span>
Confirmar
</button>
<dialog>
<article>
<h2>Cancelar agendamento?</h2>
<div class="flex">
<button class="btn-manter-dialog py-2 px-4 flex items-center text-sm gap-1 space-x-2 ">Manter
</button>
<button id="${data.register_id}" class="btn-cancelar-dialog py-2 px-4 flex items-center text-sm gap-1 space-x-2 ">Cancelar
</button>
</div>
</article>
</dialog>

</div>
    
`;
    timeArticle.querySelector(".btn-admin-agenda-cancelar").addEventListener('click', async () => {
        timeArticle.querySelector(`dialog`).showModal()
    })
    timeArticle.querySelector(".btn-cancelar-dialog").addEventListener('click', async () => {
        await deleteRegister(data.register_id)
        atualizaHoras()
        timeArticle.querySelector(`dialog`).close()
    }

    )
    timeArticle.querySelector(".btn-manter-dialog").addEventListener('click', async () => {
        timeArticle.querySelector(`dialog`).close()
    }

    )


    timeContainer.appendChild(timeArticle);

}

async function setNormalScheduleData(horario) {
    //console.log(data)
    const timeArticle = document.createElement('article');
    timeArticle.className = 'scheduleCard p-4 gap-2 rounded-xl flex flex-col transition-colors';
    timeArticle.style.backgroundColor = '#EFEFEF';
    timeArticle.style.borderColor = '#EFEFEF';

    timeArticle.innerHTML = `
    <div class="flex items-start justify-between ">
        <div class="flex gap-2 h-fit">
            <div class="h-12 aspect-square"><img class="h-full aspect-square"></div>
            <div class="flex flex-col h-fit">
            <p class="font-semibold text-base">Horário livre</p>
            </div>
        </div>
        <div class="flex items-center gap-1">
            <i class="material-icons text-[19px] leading-none">today</i>
            <p class="font-[inter] text-[#49454F]">${horario.start_hour}h – ${horario.end_hour}h</p>
        </div>
    </div>
    <div class="w-full h-fit flex justify-end gap-2">
        <button class="btn-admin-agenda-cancelar py-2 px-4 flex items-center text-sm gap-1 space-x-2 ">
    <span class="material-symbols-outlined">close</span>
  Preencher
</button>

<button class="btn-admin-agenda-confirmar py-2 px-4 flex items-center text-sm gap-1 space-x-2 ">
  <span class="material-symbols-outlined text-white">lock_open</span>
  Reservar
</button>


    </div>
        
    `;

    timeContainer.appendChild(timeArticle);

}

async function retriveRegister(data) {
    return await getRegister(data.date)
}


async function atualizaHoras() {
    const Mes = (num) => (num + 1).toString().padStart(2, "0");
    const anoMesDia = `${ano}-${Mes(mes)}-${numeroDoDia.textContent}`;

    const scheduleData = await getSchedule(anoMesDia, anoMesDia);
    listarHorasDia(scheduleData[0]);
}

async function chanceRetriveStatus(sendStatus, register_id) {
    await updateRegisterStatus({ status: sendStatus }, register_id)
}