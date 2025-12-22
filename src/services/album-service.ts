import { supabase } from '@/lib/supabase';
import type { Album } from '@/types';

/**
 * Transform database row to Album type
 * Maps CSV column names to app's Album interface
 */
function transformAlbum(row: any): Album {
  return {
    id: String(row.id), // Convert numeric ID to string
    title: row.album_name,
    artist: row.artist_name,
    coverUrl: row.full_photo_url,
    rating: parseFloat(row.rating),
  };
}

/**
 * Fetch a random album from Supabase
 * Generates a random ID between 1-96 and fetches that album
 */
export async function getRandomAlbum(): Promise<Album> {
  // Generate random ID between 1 and 96
  const randomId = Math.floor(Math.random() * 96) + 1;

  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('id', randomId)
    .single();

  if (error) {
    console.error('Error fetching album:', error);
    throw new Error('Failed to fetch album from database');
  }

  if (!data) {
    throw new Error('No album found in database');
  }

  return transformAlbum(data);
}

/**
 * Fetch album by ID
 */
export async function getAlbumById(id: number): Promise<Album> {
  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching album ${id}:`, error);
    throw new Error('Failed to fetch album');
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
    .from('albums')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching albums:', error);
    throw new Error('Failed to fetch albums');
  }

  return data.map(transformAlbum);
}
