import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject } from '../../../node_modules/rxjs';
import { of } from 'rxjs';


import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/catch'

import 'rxjs/add/operator/distinctUntilChanged'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>  
  private subjectPesquisa: Subject<string> = new Subject<string>()


  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  
    //retorno Oferta[]
    this.ofertas = this.subjectPesquisa
                  .debounceTime(1000)
                  .distinctUntilChanged()
                  .switchMap((termoDaBusca: string)=>{
                    console.log('requisição http para a api ')
                    if(termoDaBusca.trim()===''){
                      return of<Oferta[]>([]);
                    }
                    return this.ofertasService.pesquisaOfertas(termoDaBusca)
                  })
                  .catch((erro: any)=>{
                    console.log(erro)
                    return of<Oferta[]>([]);
                  })

    this.ofertas.subscribe(
      (ofertas: Oferta[])=> console.log(ofertas)
    )


  }


  public pesquisa(termoDaBusca: string): void{
    console.log('keyup caracter:', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
    
 
    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca)
   
  // this.ofertas.subscribe(
  //   (ofertas: Oferta[]) => console.log(ofertas),
  //   (erro: any) => console.log (erro),
  //   ()=>console.log('fluxo de eventos completo')
  //  )
}

}
