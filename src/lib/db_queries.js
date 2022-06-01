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

export const upload_picture = async function (x,y) {
  const { data, error } = await supabase.storage
    .from('pictures')
    .upload(x, y)
}

export const download_picture = async function(x){
  const { data, error } = await supabase.storage.from('pictures').download(x)
  return {data, error}
}


export const delete_data = async function(x){
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
