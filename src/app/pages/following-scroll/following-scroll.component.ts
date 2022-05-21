import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-following-scroll',
  templateUrl: './following-scroll.component.html',
  styleUrls: ['./following-scroll.component.scss']
})
export class FollowingScrollComponent implements OnInit {

  constructor() { }

  items: number[] = []
  ngOnInit(): void {

    for (let i = 0; i < 50; i++) {
      this.items.push(i);
    }
  }

}
