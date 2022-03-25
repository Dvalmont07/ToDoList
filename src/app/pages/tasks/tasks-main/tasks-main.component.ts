import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ITask } from 'src/app/interfaces/iTask';
import { TasksService } from 'src/app/services/tasks.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Cmyk, ColorPickerService } from 'ngx-color-picker';
import { Editor } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';



// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit, OnDestroy {

  editor: any;
  html: any;

  taskList: ITask[] = [];
  task: any;
  htmlContent: any;
  htmlContent2: any;

  config: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Digite seu texto aqui',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  public color1: string = '#2889e9';

  @ViewChild('contentx') contextx!: HTMLElement;
  // @ViewChild('contentx') contextx!: ElementRef;


  constructor(
    private tasksService: TasksService,
    private renderer: Renderer2,
    private el: ElementRef,
    public vcRef: ViewContainerRef,
    private cpService: ColorPickerService) { }

  //Quill

  //end Quill


  ngOnInit(): void {
    this.getTaskList();
    this.editor = new Editor({

      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
      plugins: [], //https://prosemirror.net/docs/guide/#state
      schema, //https://prosemirror.net/examples/schema/
      nodeViews: {}, //https://prosemirror.net/docs/guide/#state,
      attributes: {}, // https://prosemirror.net/docs/ref/#view.EditorProps.attributes
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }




  getTaskList() {
    this.tasksService.get().subscribe((t) => (this.taskList = t));
  }

  openTaskDetails(task: any) {
    //console.log(task);

    this.task = task;

  }

  downloadPDF() {

    // parentdiv is the html element which has to be converted to PDF
    let data = document.querySelector("#contextx") as HTMLElement
    html2canvas(data).then(canvas => {
      // html2canvas(document.querySelector("#contextx")).then(canvas => {

      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

    });
  }

  toPDF() {
    let data = document.querySelector("#contextx") as HTMLElement
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 210;
      var pageHeight = 297;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      let count = 0;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;

        if (count > 0) {
          pdf.addPage();
        }

        count++;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;
      }

      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  onChangeColor(event: any) {
    //console.log(event);

  }

  teste2() {
    // console.log("html", this.html);

  }

  blur() {
    // console.log("blue");

  }

}
