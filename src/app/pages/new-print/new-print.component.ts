import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-new-print',
  templateUrl: './new-print.component.html',
  styleUrls: ['./new-print.component.scss']
})
export class NewPrintComponent implements OnInit {

  constructor() { }

  list = [
    { Placeholder: false, Title: "abacaxi", Height: 280.5 },
    { Placeholder: false, Title: "abacate", Height: 280.5, },
    { Placeholder: false, Title: "banana", Height: 280.5, },
    { Placeholder: false, Title: "maçã", Height: 280.5, },
    { Placeholder: false, Title: "pera", Height: 100 },
    { Placeholder: false, Title: "uva", Height: 150 },
    { Placeholder: false, Title: "pinha", Height: 200 },
    { Placeholder: false, Title: "fruta-pão", Height: 250 },
    { Placeholder: false, Title: "manga", Height: 150 },
    { Placeholder: false, Title: "cajá", Height: 160 },
    { Placeholder: false, Title: "Tamarindo", Height: 74 },
    { Placeholder: false, Title: "cereja", Height: 174 },
    { Placeholder: false, Title: "limão", Height: 80, },
    { Placeholder: false, Title: "laranja", Height: 100, },
    { Placeholder: false, Title: "pitango", Height: 150, },
    { Placeholder: false, Title: "pitomba", Height: 100, },
  ];
  ngOnInit(): void {
  }

  public setPreviewMode() {
    const rightPanel = document.querySelector(".right-panel");
    const boxes = document.querySelectorAll(".left-panel .boxes");
    const footer = document.createElement("div");
    let blankSpace = document.createElement("div") as HTMLDivElement;

    footer.setAttribute("class", "footer");
    footer.setAttribute("style", "width:297mm; height:40px");
    const maxlHeight = 1145.519685;//1122.519685;
    let totalSize = 0;
    let sizeLeft = maxlHeight;

    boxes.forEach(box => {
      if (box.clientHeight < sizeLeft) {
        rightPanel?.appendChild(box.cloneNode(true));
        sizeLeft -= box.clientHeight;
      } else {
        let clone = blankSpace.cloneNode(true) as HTMLDivElement;
        clone.setAttribute("style", "height:" + sizeLeft + "px; width:100%; background-color:aqua;border: 1px solid royalblue; ");
        rightPanel?.appendChild(clone);
        sizeLeft = maxlHeight;
      }
    });

  }

  public gerarPDF() {

    let data = document.querySelector(".right-panel") as HTMLElement;

    //console.log("dataaaaa", data);

    html2canvas(data,
      {
        useCORS: true,
        scale: 1,

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

}
