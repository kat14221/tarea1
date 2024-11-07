import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CategoriaService } from '../../categoria/services.service';
import { MessageService } from 'primeng/api';
import { Categoria } from '../../categoria/categoria';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [SidebarComponent, FormsModule,CommonModule,SidebarModule,ButtonModule],  
  providers: [MessageService],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaEdit: Categoria = new Categoria();
  selectedCategoria: Categoria | null = null; 
  visible: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  openAddDialog() {
    this.categoriaEdit = new Categoria();  
    this.selectedCategoria = null;         
    this.visible = true;
  }

  openEditDialog(categoria: Categoria) {
    this.categoriaEdit = { ...categoria };
    this.selectedCategoria = categoria;
    this.visible = true;
  }

  addCategoria() {
    this.categoriaService.createCategoria(this.categoriaEdit).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category created' });
        this.listarCategorias();
        this.visible = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create category' });
      },
    });
  }

  updateCategoria() {
    if (this.selectedCategoria && this.selectedCategoria.id) {
      this.categoriaService.updateCategoria(this.selectedCategoria.id, this.categoriaEdit).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated' });
          this.listarCategorias();
          this.visible = false;
          this.selectedCategoria = null; // Reinicia después de actualizar
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update category' });
        },
      });
    }
  }

  deleteCategoria(id: number) {
    this.categoriaService.deleteCategoria(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted' });
        this.listarCategorias();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete category' });
      },
    });
  }
}