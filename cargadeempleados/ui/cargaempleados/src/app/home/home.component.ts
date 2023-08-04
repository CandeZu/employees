import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  // data: any[] = [];
  // constructor(private myService: MyServiceService) { }

   ngOnInit(): void {
  //   this.llenarData();
  }

  // llenarData(){
  //   this.myService.getData().subscribe((res: any) => {
  //     this.data = res;
  //     console.log(this.data);
  //   });
  // }


}
