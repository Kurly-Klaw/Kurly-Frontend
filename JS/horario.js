const daysContainer = document.getElementById('days-container');
const numeroDoDia = document.getElementById('numero-do-dia');
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Domingo a Sábado

// Gerar 31 dias
for (let day = 1; day <= 31; day++) {
    const date = new Date();
    date.setDate(day);
    const weekDayIndex = date.getDay(); // 0 (Domingo) a 6 (Sábado)

    const dayElement = document.createElement('label');
    dayElement.className = 'flex flex-col items-center cursor-pointer flex-shrink-0';
    dayElement.innerHTML = `
        <input type="radio" name="day" class="day-radio" ${day === 1 ? 'checked' : ''}>
        <p class="text-sm font-medium mb-1">${weekDays[weekDayIndex]}</p>
        <div class="day-number aspect-square w-7 border-black border rounded-full flex items-center justify-center">
            <p class="text-base text-black font-semibold">${day}</p>
        </div>
    `;

    // Selecionar o input radio e adicionar evento de change
    const radioInput = dayElement.querySelector('input');
    radioInput.addEventListener('change', () => {
        if (radioInput.checked) {
            numeroDoDia.textContent = day; // Atualiza o número do dia
        }
    });

    daysContainer.appendChild(dayElement);
}

// Inicializa o número do dia com o valor 1 (já que o dia 1 começa selecionado)
numeroDoDia.textContent = 1;

const timeContainer = document.getElementById('time-container');
let startHour = 7;

function toggleDisponibilidade(event) {
  const article = event.currentTarget;
  const disponivel = article.getAttribute('data-disponivel') === 'true';
  
  // Alterna estado
  const novoEstado = !disponivel;
  article.setAttribute('data-disponivel', novoEstado);
  
  // Atualiza estilo e texto
  const texto = article.querySelector('.font-semibold');
  texto.textContent = novoEstado ? 'Disponível' : 'Indisponível';
    
  
 // Aplica opacidade ao fundo e ao texto
 if (novoEstado) {
    article.style.backgroundColor = '#a66159'; // Cor original
    article.style.opacity = '1'; // Opacidade total
  } else {
    article.style.backgroundColor = '#a66159'; // Mantém a cor, mas com opacidade
    article.style.opacity = '0.32'; // Opacidade 12%
  }
}
 


for(let i = 0; i < 5; i++) {
  const endHour = startHour + 2;
  
  const timeArticle = document.createElement('article');
  timeArticle.className = 'p-4 rounded-xl flex justify-between transition-colors cursor-pointer';
  timeArticle.style.backgroundColor = '#a66159';
  timeArticle.setAttribute('data-disponivel', 'true');
  
  timeArticle.innerHTML = `
    <p class="font-semibold">Disponível</p>
    <div class="flex gap-1 items-center">
      <i class="material-icons text-[1rem] leading-none">today</i>
      <p class="text-[1rem]">${startHour}h – ${endHour}h</p>
    </div>
  `;

  timeArticle.addEventListener('click', toggleDisponibilidade);
  timeContainer.appendChild(timeArticle);
  startHour = endHour;
}