import { getSchedule } from "../routes/ScheduleRoutes.js";
import { selectSchedule } from "./script-schedule.js";

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

// Funções principais
export function listarDiasDoMes() {
    const dias = Array.from({ length: ultimoDia - hoje + 1 }, (_, i) => hoje + i);
    addDay(dias);
    atualizaHoras();
}

function addDay(arr) {
    numeroDoDia.textContent = hoje;
    nomeDoMes.textContent = mesesDoAno[mes];
    nomeDoMes3.textContent = mesesDoAno[mes].toUpperCase().slice(0, 3);

    arr.forEach(dia => {
        const dayElement = document.createElement('label');
        dayElement.className = 'flex flex-col items-center cursor-pointer flex-shrink-0';
        dayElement.innerHTML = `
            <input type="radio" name="day" class="day-radio" ${dia === hoje ? 'checked' : ''}>
            <p class="text-sm font-medium mb-1">${weekDays[getDayWeek(dia)]}</p>
            <div class="day-number aspect-square w-7 border-black border rounded-full flex items-center justify-center">
                <p class="text-base text-black font-semibold">${dia}</p>
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

export function listarHorasDia(arr) {
    timeContainer.replaceChildren(); // Limpa o container antes de adicionar novos elementos

    arr.forEach(horario => {
        if (horario != null) {
            const timeArticle = document.createElement('article');
            timeArticle.className = 'p-4 rounded-xl flex justify-between transition-colors schedule-card';
            timeArticle.setAttribute('data-disponivel', !horario.is_scheduled);
            timeArticle.setAttribute('data-start', horario.start_hour);
            timeArticle.setAttribute('data-end', horario.end_hour);

            if (horario.is_scheduled) {
                timeArticle.style.opacity = '0.32';
                timeArticle.style.backgroundColor = '#A1A1A1'
            } else {
                timeArticle.classList.add('cursor-pointer');
                timeArticle.addEventListener('click', choseSchedule);
            }

            timeArticle.innerHTML = `
            <p class="font-semibold">${horario.is_scheduled ? "Indisponivel" : "Disponivel"}</p>
            <div class="flex gap-1 items-center">
                <i class="material-icons text-[1rem] leading-none">today</i>
                <p class="text-[1rem]">${horario.start_hour}h – ${horario.end_hour}h</p>
            </div>
        `;

            timeContainer.appendChild(timeArticle);
        }
    });
}

function choseSchedule(event) {
    document.querySelectorAll("#time-container .selected").forEach(el => el.classList.remove("selected"));

    const Mes = (num) => (num + 1).toString().padStart(2, "0");
    const anoMesDia = `${ano}-${Mes(mes)}-${numeroDoDia.textContent}`;
    const diaMesAno = `${numeroDoDia.textContent}/${Mes(mes)}/${ano}`;

    const timeCard = event.currentTarget;
    if (!event.target.closest('button')) {
        timeCard.classList.toggle('selected');
        selectSchedule(anoMesDia, diaMesAno, timeCard.dataset.start, timeCard.dataset.end);
    }
}

async function atualizaHoras() {
    const Mes = (num) => (num + 1).toString().padStart(2, "0");
    const anoMesDia = `${ano}-${Mes(mes)}-${numeroDoDia.textContent}`;

    const scheduleData = await getSchedule(anoMesDia, anoMesDia);
    if (scheduleData[0] != null) listarHorasDia(scheduleData[0].schedules);
    else listarHorasDia([])

}