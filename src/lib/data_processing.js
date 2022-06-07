const check_null = function(x){
    if (x === null){
        return ""
    }
    else{
        return x
    }
}

const handle_job = function(object){
    if (object[8] == "Sonstiges / Other"){
        return object[9]
    }
    else{
        return object[8]
    }
}

const to_list_ds = function (x) {
    let lst = []
    if (x.includes("Data visualization")){
        lst.push("Data Visualization")
    }
    if (x.includes("Machine learning")){
        lst.push("Machine Learning")
    }
    if (x.includes("Natural language processing")){
        lst.push("NLP")
    }
    if (x.includes("Deep learning")){
        lst.push("Deep Learning")
    }
    if (x.includes("AI")){
        lst.push("AI")
    }
    return lst
}

const to_list = function (x){
    if (x === " " || x === ""){
        return []
    }
    else{
        x = x.split(" ")
        return x
    }
}

const to_list_math = function(x){
    let lst = []
    if (x.includes("Statistik / statistics")){
        lst.push("Statistik")
    }
    if (x.includes("Logik")){
        lst.push("Machine Learning")
    }
    return lst
}



export const transform_array = function (x) {
    const y = x.slice(1,(x.length-1)).map(object => {
        return {
            email: check_null(object[5]),
            vorname: check_null(object[6]),
            nachname: check_null(object[7]),
            job: check_null(handle_job(object)),
            programming: to_list(check_null(object[16])),
            datascience: to_list_ds(check_null(object[27])),
            webdev: to_list(check_null(object[33])),
            math: to_list_math(object[36]),
            other: check_null(object[39]),
        }
    });

    return y;
}



