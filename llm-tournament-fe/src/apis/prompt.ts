import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from './index';
import { Prompt } from "../models";

export const promptKeys = {
  all: ['prompts'] as const,
  details: () => [...promptKeys.all, 'detail'] as const,
  detail: (id: number) => [...promptKeys.details(), id] as const,
};

export const prompt = {
  async getPrompt(id: number): Promise<Prompt> {
    const response = await fetch(`${API_BASE_URL}/prompts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch prompt');
    }
    return response.json();
  },

  async updatePrompt(id: number, lost: boolean): Promise<Prompt> {
    const response = await fetch(`${API_BASE_URL}/prompts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lost }),
    });
    if (!response.ok) {
      throw new Error('Failed to update prompt');
    }
    return response.json();
  },
};

export const useGetPrompt = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: promptKeys.detail(id),
    queryFn: () => prompt.getPrompt(id),
    enabled: !!id,
  });
};

export const useUpdatePrompt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, lost }: { id: number; lost: boolean }) =>
      prompt.updatePrompt(id, lost),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: promptKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
    },
  });
};