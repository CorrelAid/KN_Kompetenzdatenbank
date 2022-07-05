const check_null = function (x) {
    if (x === null) {
        return ""
    }
    else {
        return x
    }
}

// const handle_job = function(object){
//     if (object[8] == "Sonstiges / Other"){
//         return object[9]
//     }
//     else{
//         return object[8]
//     }
// }

// const to_list_ds = function (x) {
//     let lst = []
//     if (x.includes("Data visualization")){
//         lst.push("Data Visualization")
//     }
//     if (x.includes("Machine learning")){
//         lst.push("Machine Learning")
//     }
//     if (x.includes("Natural language processing")){
//         lst.push("NLP")
//     }
//     if (x.includes("Deep learning")){
//         lst.push("Deep Learning")
//     }
//     if (x.includes("AI")){
//         lst.push("AI")
//     }
//     return lst
// }

const to_list = function (x) {
    if (x === " " || x === "") {
        return []
    }
    else {
        x = x.split(",")
        return x
    }
}

// const to_list_math = function(x){
//     let lst = []
//     if (x.includes("Statistik / statistics")){
//         lst.push("Statistik")
//     }
//     if (x.includes("Logik")){
//         lst.push("Machine Learning")
//     }
//     return lst
// }

const handle_skills = function (lst) {
    let nw = {
        0:check_null(lst[0].split(",")),
        1:check_null(lst[1].split(",")),
        2:check_null(lst[2].split(",")),
        3:check_null(lst[3].split(",")),
        4:check_null(lst[4].split(",")),
        5:check_null(lst[5].split(",")),
        6:check_null(lst[6].split(",")),
        7:check_null(lst[7].split(",")),
        8:check_null(lst[8].split(","))
    };

    // lst = lst.map(function (e) {
    //     return check_null(e.split(","));
    // });
    
    console.log(nw)

    // lst = lst.flat(Infinity)

    return(nw)
    // return {
    //     "Marketing und Kommunikation": lst[0].split(","),
    //     "Concepting": lst[1].split(","),
    //     "Programmierung": lst[2].split(","),
    //     "Projektmanagement": lst[3].split(","),
    //     "Dataexpert": lst[4].split(","),
    //     "Design": lst[5].split(","),
    //     "Software Development": lst[6].split(","),
    //     "Business Development": lst[7].split(","),
    //     "Maker": lst[8].split(",")
    // }


    // if (skills_cats.includes("Marketing & Kommunikation")) {
    //     obj.cat_1 = cat_1.split(",")
    // }
    // else if (skills_cats.includes("Concepting")) {
    //     obj.cat_2 = cat_2.splir(",")
    // }
    // else if () {

    // }

    // return obj;
}

const handle_attendance = function (y) {
    if (y.includes("aktiv als Teilnehmer*in beim Hackathon dabei")) {
        return ("Teilnehmer*in")
    }
    else if (y.includes("Mentor") & !y.includes("Coach")) {
        return ("Mentor*in")
    }
    else if (y.includes("Zuschauer")) {
        return ("Zuschauer*in")
    }
    else if (y.includes("Veranstalter")) {
        return ("Veranstalter*in")
    }
    else if (y.includes("Orga-Team")) {
        return ("Veranstalter*in")
    }
    else { return (y) }
}



export const transform_array = function (x) {
    const y = x.slice(1, (x.length - 1)).map(object => {
        if (object) {
            return {
                email: check_null(object[1]),
                f_name: check_null(object[2]),
                l_name: check_null(object[3]),
                job: check_null(object[5]),
                attendance: handle_attendance(check_null(object[6])),
                skills: handle_skills([object[10], object[11], object[12], object[13], object[14], object[15], object[16], object[17], object[18]]),
                confirmed: false
            }
        }
    });

    // only allowing active participants to be displayed on website
    // function filterByAttendance(obj) {
    //     if (obj.attendance.includes("Teilnehmer*in") || obj.attendance.includes("Mentor*in")) {
    //       console.log(obj)
    //       return true;
    //     }
    //     return false;
    //   }
    let data = y;
    //   data = data.filter(filterByAttendance);
    return data;
}



