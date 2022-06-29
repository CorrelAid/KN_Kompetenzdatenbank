import { supabase } from "$lib/supabaseClient";


export const insert_data = async function (x) {
  const { data, error } = await supabase
    .from('main')
    .insert(x)
    if (error){
      throw new Error("Insert Data into db failed:" + JSON.stringify(error));
    }
}

export const get_data = async function () {
  const { data, error } = await supabase
    .from('main')
    .select()
    if (error){
      throw new Error("error getting data:" + JSON.stringify(error));
    }
  return data
}

async function delete_rows() {
  const { data, error } = await supabase.rpc('delete_all')
  if (error){
    throw new Error("row deletion failed:" + JSON.stringify(error));
  }
  
}

export const delete_everything = async function () {
  await delete_rows()
  await delete_pictures()

}

export const check_email = async function (x) {
  if (x) {
    const { data, error } = await supabase
      .from('auth_roles')
      .select("email, admin")
      .eq("email", x.toLowerCase())
    if (data.length == 1) {
      return true
    }
  }
  else {
    return false
  }

}

export const check_admin = async function (x) {
  let result;
  if (x) {
    if (x.email) {
      let { data, error } = await supabase
        .from('auth_roles')
        .select("email, admin")
        .eq("email", x.email)

      result = data[0].admin

    }
    else {
      let { data, error } = await supabase
        .from('auth_roles')
        .select("email, admin")
        .eq("email", x)

      result = data[0].admin
    }
  }

  if (result == true) {
    return true
  }
  else {
    return false
  }

}
//////////////////////

// supabase storage //

async function delete_pictures() {
  const { data, error } = await supabase
    .storage
    .emptyBucket('pictures')
    if (error){
      throw new Error("picture failed:" + JSON.stringify(error));
    }
}

export function gen_file_name(x) {
  const d = new Date();
  let time = d.getTime();
  return x + time + ".png";
};


export const find_pic_name = async function (x) {
  const { data, error } = await supabase
    .storage
    .from('pictures')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
      search: x
    })


  return data[0].name

}

export const get_pictures = async function () {
  const { data, error } = await supabase
    .storage
    .from('pictures')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    })
    if (error){
      throw new Error("error getting pictures:" + JSON.stringify(error));
    }
  return data
}

export const upload_picture = async function (x, y) {
  const { data, error } = await supabase.storage
    .from('pictures')
    .upload(x, y)
}

export const download_picture = async function (x) {

  const file_name = await find_pic_name(x)

  const { data, error } = await supabase.storage.from('pictures').download(file_name)
  return { data, error }
}


export const update_pic = async function (x, y) {

  const file_name = gen_file_name(x)

  const old = await find_pic_name(x)


  const { data, error } = await supabase
    .storage
    .from('pictures')
    .remove([old])

  const { data2, error2 } = await supabase.storage
    .from('pictures')
    .upload(file_name, y)
}



//////////////////////