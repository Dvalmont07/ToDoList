import { Component, OnInit } from '@angular/core';
import * as localForage from "localforage";


@Component({
  selector: 'app-indexDBTests',
  templateUrl: './indexDBTests.component.html',
  styleUrls: ['./indexDBTests.component.scss']
})
export class IndexDBTestsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

this.saveData({ name: 'Matos' })
  }
  saveData(data: any) {

    localForage.setItem('key2', data).then(() => {
      console.log('data was saved');
    });
  }


}
