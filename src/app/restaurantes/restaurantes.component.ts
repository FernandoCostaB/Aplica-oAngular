import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service' 



@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  constructor(private ofertasServices: OfertasService) { }

  public ofertas: Oferta[]

  ngOnInit() {
    this.ofertasServices.getOfertasPorCategoria('restaurante')
    .then((ofertas: Oferta[]) => {
         this.ofertas = ofertas
    })  
  }

}
