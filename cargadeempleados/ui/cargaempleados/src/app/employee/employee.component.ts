import { Component } from '@angular/core';
import { MyServiceService } from '../services/my-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  departments: any[] = [];
  employees: any[] = [];
  modalTitle: string = "";
  EmployeeId: number = 0;
  EmployeeName: string = "";
  Department: string = "";
  DateOfJoining: string = "";
  PhotoFileName: string = "";
  PhotoPath= environment.PHOTO_URL;


  constructor(private myService: MyServiceService) { }

  ngOnInit(): void {
    this.refreshLists();
    
  }

  refreshLists(){
    this.myService.getEmployee().subscribe((res: any) => {
      this.employees = res;
    
    });
    this.myService.getDepartment().subscribe((res: any) => {
      this.departments = res;
      
    });
  }

  addClick(){
    this.modalTitle = "Add Department";
    this.EmployeeId = 0;
    this.EmployeeName = "";
    this.Department = "";
    this.DateOfJoining = "";
    this.PhotoFileName = "";
      }

      editClick(dep: any){
        this.modalTitle = "Edit Employee";
        this.EmployeeId = dep.EmployeeId;
        this.EmployeeName = dep.EmployeeName;
        this.Department = dep.Department;
        this.DateOfJoining = dep.DateOfJoining;
        this.PhotoFileName = dep.PhotoFileName;
      }

      createClick(){
        var val = {
          EmployeeName: this.EmployeeName,
          Department: this.Department,
          DateOfJoining: this.DateOfJoining,
          PhotoFileName: this.PhotoFileName
        };

        this.myService.createEmployee(val).subscribe(res => {
          alert(res.toString());
          this.refreshLists();
        });
      }

      updateClick(){
        var val = {
          EmployeeId: this.EmployeeId,
          EmployeeName: this.EmployeeName,
          Department: this.Department,
          DateOfJoining: this.DateOfJoining,
          PhotoFileName: this.PhotoFileName
        };

        this.myService.updateEmployee(val).subscribe(res => {
          alert(res.toString());
          this.refreshLists();
        });
      }

      deleteClick(id:any){
      if
        (confirm('Are you sure?')){
        
          this.myService.deleteEmployee(id).subscribe(res => {
            alert(res.toString());
            this.refreshLists();
          });
        }
      }

}
