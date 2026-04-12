import { supabase } from "@/lib/supabase";
import type { Album } from "@/types";

function transformAlbum(row: any): Album {
  return {
    id: String(row.id),
    title: row.album_name,
    artist: row.artist_name,
    coverUrl: row.full_photo_url,
    rating: parseFloat(row.rating),
    year: row.release_date,
  };
}

/**
 * Fetch today's daily puzzle album
 * Queries the daily_puzzles table by today's date and joins to albums
 */
export async function getDailyAlbum(): Promise<Album> {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  const { data, error } = await supabase
    .from("daily_puzzles")
    .select(
      `
      scheduled_date,
      albums (*)
    `,
    )
    .eq("scheduled_date", today)
    .single();

  if (error) {
    console.error("Error fetching daily album:", error);
    throw new Error("No puzzle scheduled for today");
  }

  if (!data || !data.albums) {
    throw new Error("No puzzle scheduled for today");
  }

  return transformAlbum(data.albums);
}

/**
 * Fetch album by ID
 */
export async function getAlbumById(id: number): Promise<Album> {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching album ${id}:`, error);
    throw new Error("Failed to fetch album");
  }

  if (!data) {
    throw new Error(`No album found with ID ${id}`);
  }

  return transformAlbum(data);
}

/**
 * Fetch all albums (for testing/debugging)
 */
export async function getAllAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching albums:", error);
    throw new Error("Failed to fetch albums");
  }

  return data.map(transformAlbum);
}
