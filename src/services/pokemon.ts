import endpoint from '../config/endpoint';
import {DefaultItem, ListResponse, Pokemon, TypePokemon} from '../types/api';
import axiosClient from './axios-client';

export const getListPokemon = (url?: string) =>
  axiosClient.get<ListResponse>(url ?? endpoint.pokemon);

export const getDetailPokemon = (id?: number, name?: string) =>
  axiosClient.get<Pokemon>(`${endpoint.pokemon}/${id || name}`);

export const getListType = () =>
  axiosClient.get<ListResponse<DefaultItem<TypePokemon>>>(endpoint.type);
