import endpoint from '../config/endpoint';
import {ListResponse, Pokemon} from '../types/api';
import axiosClient from './axios-client';

export const getListPokemon = (url?: string) =>
  axiosClient.get<ListResponse>(url ?? endpoint.pokemon);

export const getDetailPokemon = (id: number) =>
  axiosClient.get<Pokemon>(`${endpoint.pokemon}/${id}`);

export const getListType = () => axiosClient.get<ListResponse>(endpoint.type);
