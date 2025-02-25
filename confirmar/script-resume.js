//Onde as coisas vão ser editadas ou colocadas
const carrinho = JSON.parse(sessionStorage.getItem("carrinho"))
const hr = document.createElement('hr')
hr.style.display='none'


//Dados
fetch("../assets/js/services.json")
    .then(response => response.json())
    .then(data => {
        Object.keys(data.items).forEach(key => {
            if (carrinho.selectedServiceKey === key) {
                let infos = {
                    img: data.items[key].img,
                    title: data.items[key].nome,
                    price: `R$ ${carrinho.total},00`,
                    details: data.items[key].detailText1,
                    start: carrinho.schedule.start_hour,
                    end: carrinho.schedule.end_hour,
                    data: carrinho.data,
                };
                remap(infos);
            }
            if (carrinho.comboServiceKeys.indexOf(key) != -1) {
                hr.style.display = 'block'
                document.getElementById("additionalSelection").prepend(hr)
                document.getElementById("additionalSelection").append(createItem(key, data.items[key]))
            }
        })
        Object.keys(data.opcionais).forEach(key => {
            if (carrinho.additionalSelection.indexOf(key) != -1) {
                document.getElementById("additionalSelection").prepend(hr)
                document.getElementById("additionalSelection").append(createItem(key, data.opcionais[key]))
            }
        })



    })

function createItem(key, item) {
    console.log("Criando item");
    const produto = document.createElement("li");
    const container = document.createElement("div");

    let subtitulo = `R$ ${item.preco} • ${item.duracao}`;

    produto.innerHTML = `
            <article class="produto resume" id="${key}">
                <div class="imgCard resume">
                    <img src="${item.img}" alt="Imagem do serviço ${item.nome}">
                </div>

            <div class=" flex flex-col gap-2 col-span-3">
                <div class="hdCard resume">
                <h3>${item.nome}</h3>
                <p>${subtitulo}</p>
            </div>
            <div class="dtCard resume">

            <p class="detalhe">${item.resumo}</p>
            </div>
            </div>
            </article>
        `;
    return produto;
}


function remap(infos) {
    document.getElementById("select-service-img").src = infos.img;
    document.getElementById("select-service-title").textContent = infos.title;
    document.getElementById("select-service-price").textContent = `R$ ${infos.price},00`;
    document.getElementById("select-service-details").textContent = infos.details;
    document.getElementById("selected-schedule").textContent = `${infos.start} - ${infos.end}`;
    document.getElementById("selected-date").textContent = infos.data;
    document.getElementById("valorTotal").textContent = infos.price;
}