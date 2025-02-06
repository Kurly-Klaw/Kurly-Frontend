function addServicePlus(event){
    const thing = event.currentTarget;
    const a = JSON.parse(localStorage.getItem('carrinho'))
    console.log(a.adicionais)
    thing.classList.toggle('selected');
}    