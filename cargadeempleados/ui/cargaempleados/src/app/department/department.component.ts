import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MyServiceService } from '../services/my-service.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: any[] = [];
  modalTitle: string = "";
  DepartmentId: number = 0;
  DepartmentName: string = "";


  constructor(private myService: MyServiceService) { }

  ngOnInit(): void {
    this.refreshLists();
    
  }

  refreshLists(){
    this.myService.getDepartment().subscribe((res: any) => {
      this.departments = res;
      console.log(this.departments);
    });
  }

  addClick(){
    this.modalTitle = "Add Department";
    this.DepartmentId = 0;
    this.DepartmentName = "";
      }

      editClick(dep: any){
        this.modalTitle = "Edit Department";
        this.DepartmentId = dep.DepartmentId;
        this.DepartmentName = dep.DepartmentName;
      }

      createClick(){
        var val = {
          DepartmentName: this.DepartmentName
        };

        this.myService.createDepartment(val).subscribe(res => {
          alert(res.toString());
          this.refreshLists();
        });
      }

      updateClick(){
        var val = {
          DepartmentId: this.DepartmentId,
          DepartmentName: this.DepartmentName
        };

        this.myService.updateDepartment(val).subscribe(res => {
          alert(res.toString());
          this.refreshLists();
        });
      }

      deleteClick(id:any){
      if
        (confirm('Are you sure?')){
        
          this.myService.deleteDepartment(id).subscribe(res => {
            alert(res.toString());
            this.refreshLists();
          });
        }
      }

  }
  

