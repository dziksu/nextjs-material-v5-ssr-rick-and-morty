import { QueryFunction, QueryKey, useQuery, UseQueryResult } from 'react-query';
import { gql, request } from 'graphql-request';
import { Characters } from '../../../types';

type ResponseType = {
  characters: Characters;
};

type ErrorResponse = {
  errors: {
    message: string;
  }[];
};

const query = gql`
  query Characters($page: Int, $search: String) {
    characters(page: $page, filter: { name: $search }) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        species
        gender
        status
        image
        type
        location {
          id
          name
          type
          dimension
        }
      }
    }
  }
`;

export const getCharacters =
  (page: number, search?: string): QueryFunction<ResponseType, QueryKey> =>
  async () => {
    try {
      const response = await request<ResponseType, { page: number; search: string }>(
        'https://rickandmortyapi.com/graphql',
        query,
        {
          page,
          search: search || '',
        },
      );
      return response as ResponseType;
    } catch (error) {
      return error as ResponseType;
    }
  };

export const useCharactersQuery = (page: number = 1, search?: string): UseQueryResult<ResponseType, ErrorResponse> => {
  return useQuery<ResponseType, ErrorResponse, ResponseType>(
    ['characters', page, search || ''],
    getCharacters(page, search),
    {
      staleTime: 30000,
    },
  );
};
