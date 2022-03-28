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
  textarea: any;
  ngOnInit(): void {

    this.textarea = document.querySelector('#fakeTextArea') as HTMLTextAreaElement;

    // this.textarea.addEventListener('blur', this.teste.bind(this));
    // this.textarea.addEventListener('keyup', this.teste.bind(this));
    // this.textarea.addEventListener('click', this.teste.bind(this));
  }

  // teste(event: any) {
  //   this.cusrsorPosition = this.textarea.selectionStart;
  //   console.log(event, this.textarea.selectionStart, this.textarea.innerHTML, event.clientX);
  // }

  list = ["CARRO", "MOTO", "AVIÃO"];

  cusrsorPosition: number = 0
  public addIntoPosition() {
    this.cusrsorPosition = this.getCaretIndex(this.textarea);
    let content = this.textarea.innerHTML;
    let textoAtePosicao = content.slice(0, this.cusrsorPosition);
    let textoAposPosicao = content.slice(this.cusrsorPosition, content.length);

    this.textarea.innerHTML = `${textoAtePosicao} ${this.mySelection} ${textoAposPosicao}`;
  }


  public addIntoPosition2() {

    console.log("works", this.mySelection);

    let textarea = document.querySelector('#fakeTextArea') as HTMLTextAreaElement;
    let cusrsorPosition = textarea.textLength;
    //  let cusrsorPosition = textarea.selectionStart;
    // let content = textarea.value;
    let content = textarea.innerHTML;

    textarea.innerHTML = `${content.slice(0, cusrsorPosition)} ${this.mySelection} ${content.slice(cusrsorPosition)}`;
    //textarea.value = `${content.slice(0, cusrsorPosition)} ${this.mySelection} ${content.slice(cusrsorPosition)}`;
    textarea.focus();

  }


  getCaretIndex(element: any) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection() as Selection;
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0) as Range;;
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
      }
    }
    return position;
  }
}
