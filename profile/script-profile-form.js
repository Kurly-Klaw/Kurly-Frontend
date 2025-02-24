export function pushForm(issues, size, type, phone, photo) {
    //console.log("Dados recebidos:", issues, size, type);

    // Atualiza o rádio (tipo de cabelo)
    let user_type = formulario.querySelector(`input[name="hairType"][value="${type}"]`);

    if (user_type) {
        user_type.checked = true;
        user_type.dispatchEvent(new Event("change"));
    
    } else {
        //console.warn("Nenhum input encontrado para o tipo:", type);
    }

    // Atualiza os checkboxes (problemas capilares)
    let checkboxes = formulario.querySelectorAll(`input[name="issues"]`);

    if (issues)
        for (let checkbox of checkboxes) {
            if (issues.includes(checkbox.value)) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event("change"));
            } else {
                checkbox.checked = false; // Caso precise resetar os outros checkboxes
            }
        }

    // Atualiza o slider de tamanho de cabelo
    const sizeMap = {
        "Curto": 0,  // Mapeando para o valor 0
        "Médio": 1,  // Mapeando para o valor 1
        "Longo": 2   // Mapeando para o valor 2
    };

    // Encontra o slider (input range)
    let slider = formulario.querySelector('#hair-size');

    if (slider) {
        // Verifica se o valor do backend existe no map
        const sliderValue = sizeMap[size] !== undefined ? sizeMap[size] : 0; // Se não tiver, coloca como "curto" (valor 0)
        slider.value = sliderValue;   // Ajusta o valor do slider
        slider.dispatchEvent(new Event("input"));  // Dispara o evento input para atualizar a interface
    } else {
        //console.warn("Slider de tamanho de cabelo não encontrado.");
    }

    let inputImg = formulario.querySelector('#input-user-img');
    let userImg = document.getElementById('imagePreview')
    if (inputImg) {
        photo = photo ? photo : "../assets/src/icons/User-icon.png"
        userImg.src = photo
        inputImg.dispatchEvent(new Event("input"))
    }

    let userPhone = formulario.querySelector('#user-phone_number')
    userPhone.value = phone
    userPhone.dispatchEvent(new Event("input"))
}
