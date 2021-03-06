import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-aonde-fica',
  templateUrl: './aonde-fica.component.html',
  styleUrls: ['./aonde-fica.component.css'],
   providers: [OfertasService]
})
export class AondeFicaComponent implements OnInit {

  public aondeFica: string = ''
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
   
    this.route.parent.params.subscribe((parametros: Params)=>{
      
    this.ofertasService.getAondeFicaPorId(parametros.id)
    .then((resposta: string)=>{
      this.aondeFica = resposta
    })
    })



    // this.ofertasService.getAondeFicaPorId(this.route.parent.snapshot.params['id'])
    // .then((resposta: string)=>{
    //   this.aondeFica = resposta
    // })
  }

}
