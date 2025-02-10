import { createUser, getUser, updateUser, deleteUser } from './UserRoutes.js';
createUser({
        "name": "gabriel",
        "email": "example2@gmail.com",
        "phone_number": "88993669345",
        "imagem": "image_blob",
        "hair_problems": [
            "ponta dupla",
            "quimica"
        ],
        "hair_routine": "Any hair routine",
        "hair_size": "Grande",
        "hair_type": "Odulado",
        "password": "sdasdfqew1234",
        "role": "user"
}).then(data => console.log(data));