import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';

import { OfertasService} from '../ofertas.service';
import { Oferta } from '../shared/oferta.model'
import "rxjs/add/observable/interval";
import "rxjs/add/operator/map";
import {CarrinhoService} from '../carrinho.service';

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


  constructor(route: ActivatedRoute, ofertasService: OfertasService, private carrinhoService: CarrinhoService) {
    this.route = route
    this.ofertasService = ofertasService
   }

  ngOnInit() {
    
    this.route.params.subscribe((parametros: Params) =>{
      this.ofertasService.getOfertasPorId( parametros.id) 
      .then((oferta: Oferta)=>{
       this.oferta = oferta
      } )
     
    })
  
  }
  
  ngOnDestroy(){
   
  }

  adicionarItemCarrinho(oferta: Oferta){
    this.carrinhoService.incluirItem(oferta);
    // console.log(this.carrinhoService.exibirItens());
  }
}
