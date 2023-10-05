import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TiposService } from 'src/app/Servicios/Tipos/tipos.service';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tipos } from 'src/app/Clases/Tipos/tipos';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {

  respuesta:string='';

  mostrarAlertGuardar:string='display:none';
  mostrarAlertModificar:string='display:none';
  mostrarAlertBorrar:string='display:none';

  idModificar:number=0;
  nombreModificar:string='';

  idBorrar:number=0;
  nombreBorrar:string='';

  displayedColumns=['Id', 'Nombre', 'Accion'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  modalRefNuevo: BsModalRef=new BsModalRef();
  modalRefModificar: BsModalRef=new BsModalRef();
  modalRefBorrar: BsModalRef=new BsModalRef();



  constructor(private tiposS:TiposService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.ListaTipos();

  }

  Guardar(id:string, nombre:string):void{

    const tipo: Tipos=new Tipos;
    tipo.Id= parseInt(id);
    tipo.Nombre=nombre;
    this.tiposS.Guardar(tipo).subscribe(response => {
      this.respuesta=response;
      this.ListaTipos();

      if(id==='0'){
        this.mostrarAlertGuardar='display:block';
        this.modalRefNuevo.hide();
        setTimeout(() => {
          this.mostrarAlertGuardar='display:none';
        }, 8000);
      }else{
        this.mostrarAlertModificar='display:block';
        this.modalRefModificar.hide();
        setTimeout(() => {
          this.mostrarAlertModificar='display:none';
        }, 8000);
      }      
    });
  }

  Borrar(id:string):void{
    this.tiposS.Borrar(parseInt(id)).subscribe(response=>{
      this.respuesta=response;
      this.ListaTipos();
      this.mostrarAlertBorrar='display:block';
      this.modalRefBorrar.hide();
      setTimeout(() => {
        this.mostrarAlertBorrar='display:none';
      }, 8000);
    });
  }

  


  ListaTipos():void{
    this.tiposS.ListaTipos().subscribe(response=>{
      this.dataSource=new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //Angular Material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  //

  //NGX-Bootstrap
  openModalNuevo(template: TemplateRef<any>) {
    this.modalRefNuevo = this.modalService.show(template);
  }

  openModalModificar(template: TemplateRef<any>, id:number, nombre:string) {
    this.idModificar=id;
    this.nombreModificar=nombre;
    this.modalRefModificar = this.modalService.show(template);
  }

  openModalBorrar(template: TemplateRef<any>, id:number, nombre:string) {
    this.idBorrar=id;
    this.nombreBorrar=nombre;
    this.modalRefBorrar = this.modalService.show(template);
  }

  //

}
