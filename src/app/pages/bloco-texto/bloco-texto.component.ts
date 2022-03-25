import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloco-texto',
  templateUrl: './bloco-texto.component.html',
  styleUrls: ['./bloco-texto.component.scss']
})
export class BlocoTextoComponent implements OnInit {

  constructor() { }
  textareaContent: any;
  mySelection: any;
  ngOnInit(): void {
  }

  list = ["CARRO", "MOTO", "AVIÃO"];

  public addIntoPosition() {

    console.log("works", this.mySelection);

    let textarea = document.querySelector('#fakeTextArea') as HTMLTextAreaElement;
     let cusrsorPosition = textarea.textLength;
    //  let cusrsorPosition = textarea.selectionStart;
    // let content = textarea.value;
     let content = textarea.innerHTML;

     textarea.innerHTML = `${content.slice(0, cusrsorPosition)} ${this.mySelection} `;
    //  textarea.value = `${content.slice(0, cusrsorPosition)} ${this.mySelection} ${content.slice(cusrsorPosition)}`;
     textarea.focus();

  }
}
