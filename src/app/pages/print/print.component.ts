import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  constructor() { }

  list = [
    { Placeholder: false, Title: "abacaxi", Height: 250 },
    { Placeholder: false, Title: "abacate", Height: 250, },
    { Placeholder: false, Title: "banana", Height: 300 },
    { Placeholder: false, Title: "maçã", Height: 250 },
    { Placeholder: false, Title: "pera", Height: 250 },
    { Placeholder: false, Title: "uva", Height: 250 },
    { Placeholder: false, Title: "pinha", Height: 250 },
    { Placeholder: false, Title: "fruta-pão", Height: 250 },
    { Placeholder: false, Title: "manga", Height: 150 },
    { Placeholder: false, Title: "cajá", Height: 250 },
    { Placeholder: false, Title: "Tamarindo", Height: 250 },
    { Placeholder: false, Title: "cereja", Height: 300 },
    { Placeholder: false, Title: "limão", Height: 250, },
    { Placeholder: false, Title: "laranja", Height: 250, },
    { Placeholder: false, Title: "pitango", Height: 250, },
    { Placeholder: false, Title: "pitomba", Height: 100, },
    // { Title: "romã", Height: 250, },
    // { Title: "tamara", Height: 250, },
    // { Title: "jaca", Height: 250, },
  ];

  // landmark = {
  //   name: 'Golden Gate Bridge',
  //   d3:'',
  //   // GeoJSON feature: https://geojson.org/
  //   location: [{
  //     type: 'type',
  //     properties: {
  //       type: 'San Francisco',
  //       state: 'California',
  //       another: { type: 'Rub', number: 12, anchor:[{zora:'ss', jux:21},{type:'tt', jux:[{Id:21, name:'tttteee'}]}] },


  //     },
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [-122.4804438, 37.8199328]
  //     }
  //   }]
  // };

  numbers = [1, [2], [3, [4]], 5];
  currentElement: any

  ngOnInit(): void {

    // this.landmark.d3 = this.landmark.name;

    // let lo = JSON.stringify(this.landmark);
    // console.log(lo);

    this.setPritableView();

    window.addEventListener('beforeunload', function (event) {
      return confirm("are you sure")
    });
    window.addEventListener('unload', function (event) {
      return confirm("are you sure 2")
    });

    const section = document.querySelector('.list-container');


    section?.addEventListener('click', this.handlerrrr.bind(this));

    //this.creatingBox();

    // (async () => {

    //   let headers = new Headers();

    //   const response = await fetch('https://www.fundamentus.com.br/resultado.php?segmento=25',{
    //     mode: 'cors',
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: headers
    // });
    //   const text = await response.text();
    //   console.log(text);
    // })();

  }



  handlerrrr(e: any) {

    let target = e.target as HTMLElement;

    console.log('clicked on body page!', target.tagName, this.currentElement);

    if (!this.currentElement) {
      this.currentElement = target;
    }

    if (this.currentElement === target) return;

    // this.currentElement = target;

    let box = target.closest('.box');
    let listItem = target.closest('.list-item');

    if (!box && !listItem) return;

    if (listItem && this.currentElement === target) {
      listItem.setAttribute("class", "list-item purple");
    }

    this.currentElement = target;
    console.log('bodybodybody', box, listItem);



  }

  setPritableView() {

    setTimeout(() => {
      const tamanhoLimite = 1122.519685;
      //const tamanhoLimite = 297;
      // const tamanhoLimite = 1113.5;
      let tamnahoRestante = tamanhoLimite;
      const footerMinHeight = 0;

      let novoArray = [];

      for (let i = 0; i < this.list.length; i++) {

        if (this.list[i].Height + footerMinHeight < tamnahoRestante) {
          novoArray.push(this.list[i]);
          tamnahoRestante -= this.list[i].Height;
        }
        else {
          novoArray.push({ Placeholder: true, Title: "placeholder", Height: (tamnahoRestante) });
          novoArray.push(this.list[i]);
          tamnahoRestante = tamanhoLimite;
          tamnahoRestante -= this.list[i].Height;
        }

        if (i === this.list.length - 1) {
          novoArray.push({ Placeholder: true, Title: "placeholder", Height: (tamnahoRestante) });
        }
        // novoArray.push({ Title: "placeholder", Height: (tamnahoRestante) });
        //   tamnahoRestante = tamanhoLimite;
      }

      this.list = novoArray;
    }, 1000);

  }




  toPDF() {

    this.setPritableView();

    let data = document.querySelector("#context") as HTMLElement

    html2canvas(data, {
      useCORS: true,
      scale: 5,
      // canvas: document.createElement('canvas'),
    }).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 210;
      var pageHeight = 297;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;

      let count = 0;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;

        if (count > 0) {
          pdf.addPage();
        }

        pdf.addImage(contentDataURL, 'PNG', 0, position + 10.583333333, imgWidth, imgHeight);
        // pdf.addImage(contentDataURL, 'PNG', 0, position - (count == 0 ? 0 : 10.583333333), imgWidth, imgHeight);

        count++;

        heightLeft -= pageHeight;
      }

      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  public gerarPDF() {

    let data = document.querySelector("#context") as HTMLElement;

    //console.log("dataaaaa", data);

    html2canvas(data,
      {
        useCORS: true,
        scale: 2,

      }).then(canvas => {

        var imgWidth = 210;
        var pageHeight = 297;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;

        let count = 0;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          if (count > 0) {
            pdf.addPage();
          }
          count++;

          const acrescimoFooter = 0///10.583333333;
          pdf.addImage(contentDataURL, 'PNG', 0, position + acrescimoFooter, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('MYPdf.pdf'); // Generated PDF
      });
  }

  public creatingBox() {

    console.log("Criando");
    
    const tamanhoLimite = 1113.5;

    const body = document.querySelector("body") as HTMLBodyElement;
    const rectangule = document.createElement("div");
    rectangule.setAttribute("id", "rectangule");
    rectangule.setAttribute("style", "width:210mm; height:297mm; border:1px solid red");
    body.appendChild(rectangule);
  }

  // download( dataurl: string="") {

  //   //dataurl.split("/").reverse();

  //   const link = document.createElement("a");
  //   link.href = "https://s3-sa-east-1.amazonaws.com/rabbot-questoes-introducao/";
  //   link.download = "2b74dbae3404bd472f384e88f7e11056.jpg";
  //   link.click();
  // }


  // downloadPDF() {

  //   // parentdiv is the html element which has to be converted to PDF
  //   let data = document.querySelector("#context") as HTMLElement
  //   html2canvas(data).then(canvas => {
  //     // html2canvas(document.querySelector("#contextx")).then(canvas => {

  //     var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);

  //     var imgData = canvas.toDataURL("image/jpeg", 1.0);
  //     pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
  //     pdf.save('converteddoc.pdf');

  //   });
  // }

  goToPosition(className: string) {
    const element = document.querySelector(className);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    element?.classList.add('highlight');
    setTimeout(() => {
      element?.classList.remove('highlight');
    }, 5000);
  }

}
