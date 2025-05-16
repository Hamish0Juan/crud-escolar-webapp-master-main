import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-screen',
  templateUrl: './registro-eventos-screen.component.html',
  styleUrls: ['./registro-eventos-screen.component.scss']
})
export class EventosScreenComponent implements OnInit {

  public lista_eventos: any[] = [];
  displayedColumns: string[] = ['titulo', 'Tipo_de_evento', 'fecha_inicio', 'fecha_fin', 'lugar', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private eventosService: EventosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerEventos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerEventos() {
    this.eventosService.obtenerEventos().subscribe(
      (res) => {
        this.lista_eventos = res;
        this.dataSource = new MatTableDataSource(this.lista_eventos);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert('No se pudieron cargar los eventos.');
      }
    );
  }

  goEditar(id: number) {
    this.router.navigate(["editar-evento", id]);
  }

  delete(id: number) {
    // Implementar modal de confirmación o lógica similar
    if (confirm("¿Estás seguro que deseas eliminar este evento?")) {
      this.eventosService.eliminarEvento(id).subscribe(() => {
        alert("Evento eliminado");
        this.obtenerEventos(); // refrescar lista
      });
    }
  }
}
