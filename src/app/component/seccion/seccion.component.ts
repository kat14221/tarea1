import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SeccionService } from '../../seccion/services.service'; 
import { Seccion } from '../../seccion/seccion'; 
import { Categoria } from '../../categoria/categoria';
import { CategoriaService } from '../../categoria/services.service'; 
import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-seccion',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CardModule, TableModule, PanelModule, ToastModule,
    ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule,ButtonModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {
  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: '1' },
    { label: 'Inactivo', value: '0' }
  ];
  categoriaOptions: Categoria[] = [];
  secciones: Seccion[] = [];
  titulo: string = '';
  opc: string = '';
  visible: boolean = false;
  seccion: Seccion = new Seccion(0, null, '1', '');

  constructor(
    private seccionService: SeccionService,
    private messageService: MessageService,
    private categoriaService: CategoriaService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.listarSecciones();
    this.cargarCategoriasActivas();
  }

  cargarCategoriasActivas() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categoriaOptions = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las categorías activas',
        });
      }
    });
  }

  listarSecciones() {
    this.seccionService.getSecciones().subscribe((data) => {
      this.secciones = data;
    });
  }

  deleteSeccion(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta sección?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.seccionService.deleteSeccion(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Correcto',
              detail: 'Sección eliminada',
            });
            this.listarSecciones();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la sección',
            });
          },
        });
      }
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Sección';
    this.opc = 'Editar';
    this.seccionService.getSeccionById(id).subscribe((data) => {
      this.seccion = data;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Sección';
    this.opc = 'Agregar';
    this.visible = true;
    this.seccion = new Seccion(0, null, '1', ''); // Resetear la sección
  }

  addSeccion() {
    if (!this.seccion.nombre || this.seccion.nombre.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre de la sección no puede estar vacío',
      });
      return;
    }

    this.seccionService.createSeccion(this.seccion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Sección registrada',
        });
        this.listarSecciones();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la sección',
        });
      },
    });
    this.visible = false;
  }

  updateSeccion() {
    this.seccionService.updateSeccion(this.seccion.id, this.seccion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Sección editada',
        });
        this.listarSecciones();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la sección',
        });
      },
    });
    this.visible = false;
  }
}
