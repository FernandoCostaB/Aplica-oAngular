import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute } from '@angular/router';

import { OfertasService} from '../ofertas.service';
import { Oferta } from '../shared/oferta.model'
import "rxjs/add/observable/interval";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta
  private route: ActivatedRoute
  private ofertasService: OfertasService


  constructor(route: ActivatedRoute, ofertasService: OfertasService  ) {
    this.route = route
    this.ofertasService = ofertasService
   }

  ngOnInit() {
   this.ofertasService.getOfertasPorId(this.route.snapshot.params['id']) 
    .then((oferta: Oferta)=>{
     this.oferta = oferta
    } )
 
  //   this.route.params.subscribe(
  //     (parametro: any)=>{console.log(parametro)},
  //     (erro: any) => console.log(erro),
  //     () => console.log('processamento foi classificado como concluido!')
  //   )
  
  
  }
  
  ngOnDestroy(){
   
  }


}
