import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// Fetch all events
export const useEvents = () => useQuery({
  queryKey: ['events'],
  queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

// Add a new event
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Delete an event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => fromSupabase(supabase.from('events').delete().eq('id', eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Update an event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

/**
 * Types and Relations:
 * 
 * type Event = {
 *   id: number;
 *   created_at: string;
 *   name: string;
 *   date: string;
 *   description: string;
 * };
 * 
 * - `id`: Primary Key
 * - `created_at`: Timestamp of creation
 * - `name`: Name of the event
 * - `date`: Date of the event
 * - `description`: Description of the event
 */