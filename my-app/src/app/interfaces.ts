import {Injectable} from '@angular/core';

export interface Member {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  homeWorldName: string;
};

export interface PeopleRequest {
  count: string;
  next: string;
  previous: string;
  results: [Member];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}


export interface PlanetRequest {
  count: string;
  next: string;
  previous: string;
  results: Planet[];
}

