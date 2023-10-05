import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuariosService } from 'src/app/Servicios/Usuarios/usuarios.service';
import { Miembro } from 'src/app/Clases/Miembro/miembro';
declare const Email: any;
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  myModal: Modal | undefined;



  startDate = new Date(1990, 0, 1);
  estadoSeleccionado: string = '';
  estadoCivil: string[] = ['Marié', 'Divorce', 'Célibataire'];
  sexoSeleccionado: string = '';
  sexo: string[] = ['F', 'G'];


  archivoCarte: any = [];
  archivosFotos: any = [];
  archivosCasierJudicaires: any = [];

  habilitarRegistrar: boolean = true;

  miembro = new Miembro();

  respuestaRegistro: string = '';

  tamañoCarte: number = 0;
  tamañoFotos: number = 0;
  tamañoCasier: number = 0;
  respuestaTamano: string = '';

  boolCarte: boolean=true;
  boolFotos:boolean = true;
  boolCasier:boolean=true;

  respuestaCarte:string='';
  respuestaPhotos:string='';
  respuestaCasier:string='';


  puntoNumero: number=0;
  


  // url = 'https://localhost:44357';
  url='http://www.pudiccgb.somee.com';


  constructor(private http: HttpClient, private usuarioS: UsuariosService) { }

  ngOnInit(): void {

  }


  selectedCarte(event: any): void {

    this.tamañoCarte=0;

    this.archivoCarte = <File>event.target.files[0];

    if(this.archivoCarte===undefined){
      return;
    }

    let tamañoMegabytes: number=0;

    tamañoMegabytes = ((this.archivoCarte.size / 1024) / 1024);

    this.tamañoCarte = tamañoMegabytes;

    this.myModal = new bootstrap.Modal(document.getElementById('modalTamaño')!, {
      keyboard: false
    });



    if (this.tamañoCarte > 1.024) {
      this.tamañoCarte = Number(this.tamañoCarte.toString().substring(0, this.tamañoCarte.toString().indexOf('.') + 3));
      this.respuestaTamano = 'Supérieure à 1 MB: ' + this.tamañoCarte + " MB en tout, entrez le fichier moins de 1 MB s'il vous plaît";
      this.myModal?.show();
      this.boolCarte=false;
      this.respuestaCarte='Carte d’identité Supérieure à 1 MB: ' + this.tamañoCarte + " MB en tout, entrez le fichier moins de 1 MB s'il vous plaît";
      this.puntoNumero=1;
    }else{
      this.boolCarte=true;
    }

  }

  selectedPhotos(event: any): void {

    this.tamañoFotos=0;

    this.archivosFotos = <File>event.target.files;

    if(this.archivosFotos===undefined){
      return;
    }


    let tamañoMegabytes: number=0;

    let i = 0;
    while (i < this.archivosFotos.length) {
      tamañoMegabytes = ((this.archivosFotos[i].size / 1024) / 1024);
      this.tamañoFotos += tamañoMegabytes;
      i++;
    }

    this.myModal = new bootstrap.Modal(document.getElementById('modalTamaño')!, {
      keyboard: false
    });

    if(this.tamañoFotos>1.024){
      this.tamañoFotos = Number(this.tamañoFotos.toString().substring(0, this.tamañoFotos.toString().indexOf('.') + 3));
      this.respuestaTamano = 'Supérieure à 1 MB: ' + this.tamañoFotos + " MB en tout, entrez les fichiers ensemble moins de 1 MB au total s'il vous plaît";
      this.myModal?.show();
      this.boolFotos=false;
      this.respuestaPhotos='Deux photos (2x2) sont supérieures à 1 MB: ' + this.tamañoFotos + " MB en tout, entrez les fichiers ensemble moins de 1 MB au total s'il vous plaît";
      this.puntoNumero=3;
    }else{
      this.boolFotos=true;

    }

  }

  selectedCasierJudicaires(event: any): void {
    this.tamañoCasier=0;
    this.archivosCasierJudicaires = <File>event.target.files;

    if(this.archivosCasierJudicaires===undefined) {
      return;
    }


    let tamañoMegabytes: number=0;
    let i = 0;
    while (i < this.archivosCasierJudicaires.length) {
      tamañoMegabytes = ((this.archivosCasierJudicaires[i].size / 1024) / 1024);
      this.tamañoCasier += tamañoMegabytes;
      i++;
    }
    this.myModal = new bootstrap.Modal(document.getElementById('modalTamaño')!, {
      keyboard: false
    });
    if(this.tamañoCasier>1.024){
      this.tamañoCasier = Number(this.tamañoCasier.toString().substring(0, this.tamañoCasier.toString().indexOf('.') + 3));
      this.respuestaTamano = 'Supérieure à 1 MB: ' + this.tamañoCasier + " MB en tout, entrez les fichiers ensemble moins de 1 MB au total s'il vous plaît";
      this.myModal?.show();
      this.boolCasier=false;
      this.respuestaCasier='Les pièces justificatives sont supérieures à 1 MB: ' + this.tamañoCasier + " MB en tout, entrez les fichiers ensemble moins de 1 MB au total s'il vous plaît";
      this.puntoNumero=8;
    }else{
      this.boolCasier=true;

    }
  }

  Registrar(id: number, localite: string, noDossier: string, nom: string, prenom: string, profession: string, nifCin: string, nomMere: string, prenomMere: string,
    nomPere: string, prenomPere: string, dateNaissance: string, lieuNaissance: string, etatCivil: string, sexe: string, cellulairePersonnel: string): void {

      // Registrar(id: number, localite: string, noDossier: string, nom: string, prenom: string, profession: string, nifCin: string, nomMere: string, prenomMere: string,
      //   nomPere: string, prenomPere: string, dateNaissance: string, lieuNaissance: string, etatCivil: string, sexe: string, autres: string, tel: string, contacterUrgence: string,
      //   telContacterUrgence: string, lienAvecPersonne: string, cellulairePersonnel: string): void {


      if(this.boolCarte===false||this.boolFotos===false||this.boolCasier===false){
        // console.log(this.respuestaArchivos);
        
        this.myModal = new bootstrap.Modal(document.getElementById('modalTamanoTodos')!, {
          keyboard: false
        });
  
        this.myModal?.show();
        
        return;
      }




    if (localite === '' || nom === '' || prenom === '' || profession === '' || nifCin === '' || nomMere === '' || prenomMere === '' || nomPere === '' || prenomPere === '' || dateNaissance === '' || lieuNaissance === '' || etatCivil === '' ||
      sexe === ''||cellulairePersonnel === '') {
        // if (localite === '' || nom === '' || prenom === '' || profession === '' || nifCin === '' || nomMere === '' || prenomMere === '' || nomPere === '' || prenomPere === '' || dateNaissance === '' || lieuNaissance === '' || etatCivil === '' ||
        // sexe === '' || this.archivoCarte.length === 0 || cellulairePersonnel === '' || this.archivosFotos.length === 0) {

      // || autres === '' || tel === '' || contacterUrgence === '' || telContacterUrgence === '' || lienAvecPersonne === ''

      // alert("Remplissez tous les champs obligatoires, s'il vous plaît");

      this.myModal = new bootstrap.Modal(document.getElementById('modalCampos')!, {
        keyboard: false
      });

      this.myModal?.show();



    } else {


      const fd = new FormData();

      fd.append('ArchivoCarteIdentiteNifCin', this.archivoCarte);

      let iFotos = 0;
      while (iFotos < this.archivosFotos.length) {
        fd.append('ArchivosPhotos', this.archivosFotos[iFotos]);
        iFotos++;
      }

      let iCasier = 0;
      while (iCasier < this.archivosCasierJudicaires.length) {
        fd.append('ArchivosCasierJudicaires', this.archivosCasierJudicaires[iCasier]);
        iCasier++;
      }

      fd.append('Id', id.toString());
      fd.append('Localite', localite);
      // fd.append('NoDossier', noDossier);
      fd.append('Nom', nom);
      fd.append('Prenom', prenom);
      fd.append('Profession', profession);
      fd.append('NifCin', nifCin);
      fd.append('NomMere', nomMere);
      fd.append('PrenomMere', prenomMere);
      fd.append('NomPere', nomPere);
      fd.append('PrenomPere', prenomPere);
      fd.append('DateNaissance', dateNaissance);
      fd.append('LieuNaissance', lieuNaissance);
      fd.append('EtatCivil', etatCivil);
      fd.append('Sexe', sexe);
      // fd.append('Autres', autres);
      // fd.append('Tel', tel);
      // fd.append('ContacterUrgence', contacterUrgence);
      // fd.append('TelContacterUrgence', telContacterUrgence);
      // fd.append('LienAvecPersonne', lienAvecPersonne);
      fd.append('CellulairePersonnel', cellulairePersonnel);

      this.http.post(this.url + '/Miembro/Registrar', fd).subscribe(response => {

        if (response === 'Ok') {


          this.usuarioS.ConsultarMiembro(nom+prenom, nifCin).subscribe(response => {
            this.miembro = response;
            const doc = new jsPDF();

            doc.setTextColor(255, 0, 0);
            doc.setFontSize(24);
            doc.text('Formulaire d’adhésion', 65, 20);

            doc.setTextColor(0, 0, 255);
            doc.setFontSize(14);
            doc.text('Commune: ', 10, 30);
            doc.setTextColor(100);
            doc.text('Cornillon Grand-Bois', 36, 30);

            doc.setTextColor(0, 0, 255);
            doc.setFontSize(14);
            doc.text('Localité: ', 10, 40);
            doc.setTextColor(100);
            doc.text(this.miembro.Localite, 30, 40);

            doc.setTextColor(255, 0, 0);
            doc.setFontSize(16);
            doc.text('Informations sur l’adhérant(es)', 65, 50);

            doc.setTextColor(0, 0, 255);
            doc.setFontSize(14);
            doc.text('No. Dossier: ', 10, 60);
            doc.setTextColor(100);
            doc.text(this.miembro.NoDossier, 39, 60);

            doc.setTextColor(0, 0, 255);
            // doc.setFontSize(14);
            doc.text('Nom: ', 10, 70);
            doc.setTextColor(100);
            doc.text(this.miembro.Nom, 24, 70);

            doc.setTextColor(0, 0, 255);
            // doc.setFontSize(14);
            doc.text('Prénom: ', 10, 80);
            doc.setTextColor(100);
            doc.text(this.miembro.Prenom, 30, 80);

            doc.setTextColor(0, 0, 255);
            doc.text('Profession: ', 10, 90);
            doc.setTextColor(100);
            doc.text(this.miembro.Profession, 37, 90);

            doc.setTextColor(0, 0, 255);
            doc.text('NIF/CIN: ', 10, 100);
            doc.setTextColor(100);
            doc.text(this.miembro.NifCin, 31, 100);

            doc.setTextColor(0, 0, 255);
            doc.text('Nom de la mère: ', 10, 110);
            doc.setTextColor(100);
            doc.text(this.miembro.NomMere, 49, 110);

            doc.setTextColor(0, 0, 255);
            doc.text('Prenom de la mère: ', 10, 120);
            doc.setTextColor(100);
            doc.text(this.miembro.PrenomMere, 56, 120);

            doc.setTextColor(0, 0, 255);
            doc.text('Nom du père: ', 10, 130);
            doc.setTextColor(100);
            doc.text(this.miembro.NomPere, 42, 130);

            doc.setTextColor(0, 0, 255);
            doc.text('Prenom du père: ', 10, 140);
            doc.setTextColor(100);
            doc.text(this.miembro.PrenomPere, 48, 140);

            doc.setTextColor(0, 0, 255);
            doc.text('Date de Naissance: ', 10, 150);
            doc.setTextColor(100);
            doc.text(this.miembro.DateNaissance.substring(0, this.miembro.DateNaissance.indexOf(' ')), 55, 150);

            doc.setTextColor(0, 0, 255);
            doc.text('Lieu de Naissance: ', 10, 160);
            doc.setTextColor(100);
            doc.text(this.miembro.LieuNaissance, 55, 160);

            doc.setTextColor(0, 0, 255);
            doc.text('État civil: ', 10, 170);
            doc.setTextColor(100);
            doc.text(this.miembro.EtatCivil, 32, 170);

            doc.setTextColor(0, 0, 255);
            doc.text('Sexe: ', 10, 180);
            doc.setTextColor(100);
            doc.text(this.miembro.Sexe, 25, 180);

            doc.setTextColor(0, 0, 255);
            doc.text('Numéro de cellulaire à titre personnel: ', 10, 190);
            doc.setTextColor(100);
            doc.text(this.miembro.CellulairePersonnel, 97, 190);

            doc.setTextColor(0, 0, 255);
            doc.text("Date d'enregistrement: ", 10, 200);
            doc.setTextColor(100);
            doc.text(this.miembro.FechaRegistro, 62, 200);




            // doc.setTextColor(0, 0, 255);
            // doc.text('Autres: ', 10, 190);
            // doc.setTextColor(100);
            // doc.text(this.miembro.Autres, 28, 190);

            // doc.setTextColor(0, 0, 255);
            // doc.text('Tel: ', 10, 200);
            // doc.setTextColor(100);
            // doc.text(this.miembro.Tel, 21, 200);

            // doc.setTextColor(0, 0, 255);
            // doc.text('Personne à contacter en cas d’urgence: ', 10, 210);
            // doc.setTextColor(100);
            // doc.text(this.miembro.ContacterUrgence, 100, 210);

            // doc.setTextColor(0, 0, 255);
            // doc.text('Tel: ', 10, 220);
            // doc.setTextColor(100);
            // doc.text(this.miembro.TelContacterUrgence, 21, 220);

            // doc.setTextColor(0, 0, 255);
            // doc.text('Lien avec la personne: ', 10, 230);
            // doc.setTextColor(100);
            // doc.text(this.miembro.LienAvecPersonne, 62, 230);

            // doc.setTextColor(0, 0, 255);
            // doc.text('Numéro de cellulaire à titre personnel: ', 10, 240);
            // doc.setTextColor(100);
            // doc.text(this.miembro.CellulairePersonnel, 97, 240);

            // doc.setTextColor(0, 0, 255);
            // doc.text("Date d'enregistrement: ", 10, 250);
            // doc.setTextColor(100);
            // doc.text(this.miembro.FechaRegistro, 62, 250);


            let nombrePDF: string;
            nombrePDF = this.miembro.NoDossier + ' - ' + this.miembro.Nom + ' ' + this.miembro.Prenom + '.pdf';

            doc.save(nombrePDF);

            let archivoPDF: any;
            archivoPDF = doc.output('datauristring');

            Email.send({
              Host: "smtp.gmail.com",
              Username: "mandarcorreo1342@gmail.com",
              Password: "nzvuvxrsjijtiovw",
              To: 'abelardelias25@gmail.com , caeliepudiccgb020@gmail.com',
              // To: 'abelardelias25@gmail.com',
              From: "mandarcorreo1342@gmail.com",
              Subject: this.miembro.NoDossier + ' - ' + this.miembro.Nom + ' ' + this.miembro.Prenom + ' - Enregistrement généré Pudiccgb',
              Body: this.miembro.NoDossier + ' - ' + this.miembro.Nom + ' ' + this.miembro.Prenom + ' - Enregistrement généré Pudiccgb',
              Attachments: [
                {
                  name: nombrePDF,
                  data: archivoPDF
                }]
            });

          });

          this.respuestaRegistro = 'Vous vous êtes inscrit avec succès';
          this.myModal = new bootstrap.Modal(document.getElementById('myModal')!, {
            keyboard: false
          });

          this.myModal?.show();


          setTimeout(() => {
            location.reload();
          }, 5000);
        } else {
          this.respuestaRegistro = 'Une erreur est survenue';
        }

      });


    }



  }





}
