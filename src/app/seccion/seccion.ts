import { Categoria } from "../categoria/categoria";

export class Seccion {
  id: number;
  categoria: Categoria | null;
  estado: string;
  nombre: string;

  constructor(id: number = 0, categoria: Categoria | null = null, estado: string = '1', nombre: string = '') {
    this.id = id;
    this.categoria = categoria;
    this.estado = estado;
    this.nombre = nombre;
  }
}
