import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService} from '../ofertas.service'

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {



  constructor(private ofertasServices: OfertasService) { }

  public ofertas: Oferta[]

  ngOnInit() {

    this.ofertasServices.getOfertasPorCategoria('diversao')
    .then((ofertas: Oferta[])=>{
      this.ofertas = ofertas
    })
     
  }

}
