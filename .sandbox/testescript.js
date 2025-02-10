


document.getElementById('request').addEventListener('click', async () => {

    let nome = document.getElementById('name');
    let contato = document.getElementById('contato');
    let email = document.getElementById('email');



    let user = await createUser({
        "name": "Gabriel Oliveira Santos",
        "email": "gabriel.oliveira10@example.com",
        "phone_number": "88993669345",
        "imagem": "image_blob",
        "hair_problems": [
            "ponta dupla",
            "química",
            "queda de cabelo",
            "ressecamento"
        ],
        "hair_routine": "Shampoo hidratante, máscara de tratamento, uso de óleos para hidratação e finalização com leave-in.",
        "hair_size": "Grande",
        "hair_type": "Ondulado",
        "password": "sdasdfqew1234",
        "role": "user"
    })

    

    let populate = await getUser(user.user_id);

    document.getElementById('name').innerHTML = populate.name;
    document.getElementById('email').innerHTML = populate.email;
    document.getElementById('contato').innerHTML = populate.phone_number;
})



