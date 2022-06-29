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

const handle_skills = function (skills_cats, cat_1, cat_2, cat_3, cat_4, cat_5, cat_6, cat_7, cat_8, cat_9) {
    let obj = {};
    if (skills_cats.includes("Marketing & Kommunikation")) {
        obj.cat_1 = cat_1
    }
    else if (skills_cats.includes("Concepting")) {
        obj.cat_2 = cat_2
    }
    return obj;
}

const handle_attendance = function(x){
    if (x.includes("aktiv als Teilnehmer*in beim Hackathon dabei")){
        return("Aktive Teilnehmer*in")
    }
    else if (x.includes("Mentor")){
        return("Mentor*in")
    }
    else{return(x)}
}



export const transform_array = function (x) {
    const y = x.slice(1, (x.length - 1)).map(object => {
        return {
            email: check_null(object[1]),
            f_name: check_null(object[2]),
            l_name: check_null(object[3]),
            job: check_null(object[5]),
            attendance: handle_attendance(object[6]),
            skills: handle_skills(object[9], object[10], object[11], object[12], object[13], object[14], object[15], object[16], object[17], object[18]),
            confirmed: false
        }
    });

    function filterByAttendance(obj) {
        if (obj.attendance.includes("Aktive Teilnehmer*in") || obj.attendance.includes("Mentor*in")) {
          console.log(obj)
          return true;
        }
        return false;
      }
      let data = y;
      data = data.filter(filterByAttendance);
      console.log(data)
    return data;
}



