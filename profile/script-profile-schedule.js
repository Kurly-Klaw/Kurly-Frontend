//Estrutura do item
const produto = document.createElement("li");
const container = document.createElement("li");
produto.innerHTML = `<article class=${classes} id=${key} ${funcao}>
<div class="imgCard">
<img src="${item.img}" alt="Imagem do serviço ${item.nome}.">
</div>
</article>`;

//Estrutura do container dos detalhes do item
container.innerHTML = `<div class="hdCard">
<h3>${item.nome}</h3>
<p>${subtitulo}</p>
</div>
<div class="dtCard">
<p>${item.detailText1}</p>
<p>${item.detailText2}</p>
</div>
<div class="btnCard">
<button class= '${btnclasse}' ${btnfuncao} ${data_includes} data-id="${key}">${btnText}</button>
</div>
<div class="seta"> ▲</div>`;