export class Categoria {
    id: number;
    estado: string;
    nombre: string;
  
    constructor(id: number = 0, estado: string = '1', nombre: string = '') {
      this.id = id;
      this.estado = estado;
      this.nombre = nombre;
    }
  }
  