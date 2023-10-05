import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Proyectos } from 'src/app/Clases/Proyectos/proyectos';
import { Tipos } from 'src/app/Clases/Tipos/tipos';
import { ProyectosService } from 'src/app/Servicios/Proyectos/proyectos.service';
import { TiposService } from 'src/app/Servicios/Tipos/tipos.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

//import { TiposService } from '../../../../assets/Imagenes';
//src\assets\Imagenes
//C:/Users/ABCDE/OneDrive/Documentos/a/Angular/PudiccAngular/src/assets/Imagenes

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  // url='https://localhost:44357';
  url='http://www.pudiccgb.somee.com';

  mostrar?:boolean;

  selectedFile: any = [];

  tipos: Tipos[] = [];
  tiposNuevos: Tipos[] = [];
  proyectos: Proyectos[] = [];

  mostrarAlertGuardar: string = 'display:none';
  mostrarAlertModificar: string = 'display:none';
  mostrarAlertBorrar: string = 'display:none';



  modalRefNuevo: BsModalRef = new BsModalRef();
  modalRefModificar: BsModalRef = new BsModalRef();
  modalRefBorrar: BsModalRef = new BsModalRef();


  datosDetalles = new Proyectos();

  datosModificar = new Proyectos();

  datosBorrar = new Proyectos();


  testModal: Modal | undefined;

  selectedSelect: number = 0;

  tamañoTotalArchivos: number = 0;


  constructor(private tipoS: TiposService, private proyectoS: ProyectosService, private modalService: BsModalService,
    private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.SelectTipos();
    this.ValidarMostrarBotones();
  }

  ValidarMostrarBotones():void{
    let id=sessionStorage.getItem('Id');
    if(id!==null){
      this.mostrar=true;
    }else{
      this.mostrar=false;
    }
  }

  // openDialogDetalles(id:number, titulo: string, descripcion: string, imagen: string, idTipo: number, nombreTipo: string) {

  //   this.datosDetalles.Id=id;
  //   this.datosDetalles.Titulo=titulo;
  //   this.datosDetalles.Descripcion=descripcion;
  //   this.datosDetalles.Imagen=imagen;
  //   this.datosDetalles.IdTipo=idTipo;
  //   this.datosDetalles.NombreTipo=nombreTipo;

  //   const dialogRef = this.dialog.open(MatdialoglargeComponent,{
  //     data: this.datosDetalles
  //   });

  // }


  AbrirModalDetalles(id: number, titulo: string, descripcion: string, imagen: string, idTipo: number, nombreTipo: string): void {

    this.datosDetalles.Id = id;
    this.datosDetalles.Titulo = titulo;
    this.datosDetalles.Descripcion = descripcion;
    this.datosDetalles.Imagen = imagen;
    this.datosDetalles.IdTipo = idTipo;
    this.datosDetalles.NombreTipo = nombreTipo;

    this.testModal = new bootstrap.Modal(document.getElementById('modalDetalles')!, {
      keyboard: false
    });

    this.testModal?.show();
  }

  AbrirModalBorrar(id: number, titulo: string, idTipo: number): void {
    this.datosBorrar.Id = id;
    this.datosBorrar.Titulo = titulo;
    this.datosBorrar.IdTipo = idTipo;

    this.testModal = new bootstrap.Modal(document.getElementById('modalBorrar')!, {
      keyboard: false
    });

    this.testModal?.show();

  }

  EjecutarBorrar(id: string, idTipo: number): void {

    this.proyectoS.Borrar(Number(id)).subscribe(response => {



      if (response === 'Ok') {
        this.mostrarAlertBorrar = 'display:block';
        this.testModal?.hide();

        console.log(idTipo);

        this.CardsPublicacion(idTipo);
        this.selectedSelect = idTipo;
        setTimeout(() => {
          this.mostrarAlertBorrar = 'display:none';
        }, 8000);
      }else{
        alert(response);
      }
    });
  }



  onFileSelected(event: any) {

    this.selectedFile = <File>event.target.files;

    let tamañoMegabytes: number;

    this.tamañoTotalArchivos = 0;

    let i = 0;
    while (i < this.selectedFile.length) {
      tamañoMegabytes = ((this.selectedFile[i].size / 1024) / 1024);

      this.tamañoTotalArchivos += tamañoMegabytes;

      i++;
    }


  }







  Guardar(id: string, titulo: string, descripcion: string, idTipo: any): void {

    if (this.tamañoTotalArchivos > 1.024) {

      this.tamañoTotalArchivos = Number(this.tamañoTotalArchivos.toString().substring(0, this.tamañoTotalArchivos.toString().indexOf('.') + 3));
      alert('Se acumulo ' + this.tamañoTotalArchivos + ' MB, por favor inserte archivos menos pesados');
      return;

    }

    const fd = new FormData();

    let i = 0;
    while (i < this.selectedFile.length) {
      fd.append('Files', this.selectedFile[i]);
      i++;
    }

    fd.append('Id', id);

    fd.append('Titulo', titulo);
    fd.append('Descripcion', descripcion);
    fd.append('IdTipo', idTipo);
    this.http.post(this.url + '/Publicacion/Guardar', fd).subscribe(response => {
      this.CardsPublicacion(idTipo);

      this.selectedSelect = idTipo;
      if (response === 'Ok') {
        if (id === '0') {
          this.mostrarAlertGuardar = 'display:block';
          this.modalRefNuevo.hide();
          setTimeout(() => {
            this.mostrarAlertGuardar = 'display:none';
          }, 8000);
        } else {
          this.mostrarAlertModificar = 'display:block';
          this.modalRefModificar.hide();
          setTimeout(() => {
            this.mostrarAlertModificar = 'display:none';
          }, 8000);
        }
      }else{
        alert(response);
      }
    });

  }





  CardsPublicacion(idTipo: number): void {
    this.proyectoS.CardsPublicacion(idTipo).subscribe(response => {
      response.map(data => {
        data.Imagen = JSON.parse(data.Imagen);
        this.proyectos = response;
        this.selectedSelect = idTipo;
      });
    });
  }




  SelectTipos(): void {
    this.tipoS.ListaTipos().subscribe(response => {
      this.tipos = response;
    });
  }






  //NGX-Bootstrap
  openModalNuevo(template: TemplateRef<any>) {
    this.tipoS.ListaTipos().subscribe(response => {
      this.tiposNuevos = response;
    });
    this.modalRefNuevo = this.modalService.show(template);
  }

  openModalModificar(template: TemplateRef<any>, id: number, titulo: string, descripcion: string, imagen: string, idTipo: number, nombreTipo: string) {
    this.tipoS.ListaTipos().subscribe(response => {
      this.tiposNuevos = response;

      this.datosModificar.Id = id;
      this.datosModificar.Titulo = titulo;
      this.datosModificar.Descripcion = descripcion;
      this.datosModificar.Imagen = imagen;
      this.datosModificar.IdTipo = idTipo;
      this.datosModificar.NombreTipo = nombreTipo;

      this.modalRefModificar = this.modalService.show(template);

    });


  }



  //
}

