import {TypePokemon} from '../types/api';

export function generateColorsType(type: TypePokemon) {
  const baseColor = {
    normal: '#546E7A',
    fighting: '#F4511E',
    flying: '#00ACC1',
    poison: '#8E24AA',
    ground: '#6D4C41',
    rock: '#757575',
    bug: '#00897B',
    ghost: '#BDBDBD',
    steel: '#9E9E9E',
    fire: '#E53935',
    water: '#E53935',
    grass: '#43A047',
    electric: '#FDD835',
    psychic: '#FB8C00',
    ice: '#039BE5',
    dragon: '#5E35B1',
    dark: '#455A64',
    fairy: '#F06292',
    unknown: '#616161',
    shadow: '#37474F',
  };
  return baseColor[type] || baseColor.unknown;
}

export function generateDigit(num: number) {
  return num.toString().padStart(3, '0');
}
