export async function getService(key) {
    const data = await getServices("items")
    let response = {}
    
    Object.entries(data).forEach(([service, item]) => {
        if (key == service){
            response = item
        }
    })

    return response
}

async function readJSON() {
    const pathOfServices = "../assets/js/services.json"
    const response = await fetch(pathOfServices);
    return response.json()
}

export async function getServices(filter="items"){
    let a = await readJSON()
    //console.log(a.items)
    filter = "items" ? a.items : a.acrescimos;
    return filter
}