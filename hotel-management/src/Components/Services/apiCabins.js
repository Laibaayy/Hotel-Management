import supabase, { supabaseUrl } from "./Supabase";

async function getCabins() {
  let { data, error } = await supabase.from("Cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins cant be loaded");
  }
  return data;
}

export async function CreateCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin?.image === "string" &&
    newCabin.image.startsWith?.(supabaseUrl);

  //CREATE CABIN
  //https://humtggfyxxrfxtitfcvz.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg
  const ImageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const ImagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${ImageName}`;

  let query = supabase.from("Cabins");

  if (id) {
    query = query.update({ ...newCabin, image: ImagePath }).eq("id", id);
  }
  if (!id) {
    query = query.insert([{ ...newCabin, image: ImagePath }]);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins cant be Created");
  }

  //UPLOAD IMAGE
  if (hasImagePath) return data; //bucket m bar bar image upload na ho copy k liya
  if (!hasImagePath) {
    const { error: StorageError } = await supabase.storage
      .from("cabin-images")
      .upload(ImageName, newCabin.image, {
        cacheControl: "3600",
        upsert: false,
      });

    //Delete caabin if error uploading image

    if (StorageError) {
      await supabase.from("Cabins").delete().eq("id", data.id);
      console.error(StorageError);
      throw new Error("Cabins Image Cannot be uploaded");
    }
  }

  return data;
}

export async function DeleteCabin(id) {
  const { error, data } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be deleted");
  }
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }
}

export default getCabins;
