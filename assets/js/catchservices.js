export async function getService(key) {
    let filter
    filter = key.startsWith('o') ? "opcionais" : "items";
    const data = await getServices(filter)
    let response = {}

    Object.entries(data).forEach(([service, item]) => {
        if (key == service) {
            response = item
        }
    })

    return response
}

export async function readJSON() {
    const pathOfServices = "../assets/js/services.json"
    const response = await fetch(pathOfServices);
    return response.json()
}

export async function getServices(filter) {
    let a = await readJSON()
    filter = filter === "items" ? a.items : a.opcionais;
    return filter
}