import { QueryFunction, QueryKey, useQuery, UseQueryResult } from 'react-query';
import { gql, request } from 'graphql-request';
import { Character } from '../../../types';

type ResponseType = {
  character: Character;
};

const query = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      location {
        id
        name
        type
        dimension
      }
    }
  }
`;

export const getCharacter =
  (id: number): QueryFunction<ResponseType, QueryKey> =>
  async () => {
    const response = await request<ResponseType, { id: number }>('https://rickandmortyapi.com/graphql', query, {
      id,
    });
    return response;
  };

export const useCharacterQuery = (id: number): UseQueryResult<ResponseType, Error> => {
  return useQuery<ResponseType, Error, ResponseType>(['character', id], getCharacter(id), {
    staleTime: 30000,
  });
};
