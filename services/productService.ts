import { supabase } from "./supabase";

export const ProductService = {
  async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle(); // ✅ FIX

    if (error) {
      console.error("[getBySlug error]", error);
      return null;
    }

    return data; // có thể là object hoặc null
  },
};
