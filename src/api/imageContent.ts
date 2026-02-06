import { supabase } from "@/lib/supabaseClient";

export const getImageContent = async () => {
  const { data, error } = await supabase
    .from("image_content")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  console.log("Fetched data:", data);
  return data;
};


export const deleteImageContent =  async (id:number)=>{
  const {error } = await supabase
    .from("image_content")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return id;
}