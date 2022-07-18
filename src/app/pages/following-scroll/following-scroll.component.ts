import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-following-scroll',
  templateUrl: './following-scroll.component.html',
  styleUrls: ['./following-scroll.component.scss']
})
export class FollowingScrollComponent implements OnInit {

  constructor() { }

  items: number[] = [];
  topPos = 0;
  leftPos = 0;

  ngOnInit(): void {

    for (let i = 0; i < 50; i++) {
      this.items.push(i);
    }

    setTimeout(() => {
      const scrollBox = document.querySelector('#scrollBox') as HTMLElement;
      const items = document.querySelectorAll('.item');
      let number6 = items[6] as HTMLElement;
      const follower = document.querySelector('#follower') as HTMLElement;

      follower.style.position = "relative";
      follower.style.top = ` calc( ${ number6.offsetTop} * 1px)`;

      scrollBox.addEventListener("scroll", (event) => {
        console.log("event", event);
       
       
        this.topPos = number6.offsetTop + (-scrollBox.scrollTop);


        console.log("this.topPos" + this.topPos);


        follower.style.position = "relative";
        follower.style.top = ` calc( ${this.topPos} * 1px)`;

      });



    }, 100);
  }



}
