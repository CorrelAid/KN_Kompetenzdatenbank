import { supabase } from "$lib/supabaseClient";


export const insert_data = async function (x) {
  const { data, error } = await supabase
    .from('main')
    .insert(x)
}

export const get_data = async function () {
  const { data, error } = await supabase
    .from('main')
    .select()
  return data
}

export const upload_picture = async function (x, y) {
  const { data, error } = await supabase.storage
    .from('pictures')
    .upload(x, y)
}

export const download_picture = async function (x) {
  const { data, error } = await supabase.storage.from('pictures').download(x)
  return { data, error }
}


export const delete_data = async function (x) {
  const { data, error } = await supabase
    .from('main')
    .delete()
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
  return data
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
  if (result == true) {
    return true
  }
  else {
    return false
  }

}
