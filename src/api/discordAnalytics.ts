import { supabase } from "@/lib/supabaseClient";

export interface DiscordAnalytics {
  id: number;
  created_at: string;
  total_members: number | null;
  regular_members: number | null;
  vip_members: number | null;
  betatester_members: number | null;
  active_members_today: number | null;
  mods: number | null;
  no_role_assigned: number | null;
  total_messages_today: number | null;
  channels_analytics: any[] | null;
}

export const getDiscordAnalytics = async (): Promise<DiscordAnalytics[]> => {
  const { data, error } = await supabase
    .from("discord_analytics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  console.log("Fetched discord analytics:", data);
  return data || [];
};

export const getLatestDiscordAnalytics = async (): Promise<DiscordAnalytics | null> => {
  const { data, error } = await supabase
    .from("discord_analytics")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data;
};
