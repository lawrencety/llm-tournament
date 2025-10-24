import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from './index';
import { Tournament } from "../models";

export const tournamentKeys = {
  all: ['tournaments'] as const,
  details: () => [...tournamentKeys.all, 'detail'] as const,
  detail: (id: number) => [...tournamentKeys.details(), id] as const,
};

export const tournament = {
  async getTournaments(): Promise<Tournament[]> {
    const response = await fetch(`${API_BASE_URL}/tournaments`);
    if (!response.ok) {
      throw new Error('Failed to fetch tournaments');
    }
    return response.json();
  },

  async getTournament(id: number): Promise<Tournament> {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tournament');
    }
    return response.json();
  },

  async createTournament(tournament: Omit<Tournament, 'id'>): Promise<Tournament> {
    const response = await fetch(`${API_BASE_URL}/tournaments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tournament),
    });
    if (!response.ok) {
      throw new Error('Failed to create tournament');
    }
    return response.json();
  },
};

export const useGetTournaments = () => {
  return useQuery({
    queryKey: tournamentKeys.all,
    queryFn: tournament.getTournaments,
  });
};

export const useGetTournament = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: tournamentKeys.detail(id),
    queryFn: () => tournament.getTournament(id),
    enabled: !!id,
  });
};

export const useCreateTournament = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tournament.createTournament,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tournamentKeys.all });
    },
  });
};
