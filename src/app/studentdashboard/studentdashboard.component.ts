import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {

  studentValue!:FormGroup

  studentObj:StudentModel= new StudentModel;

  studentList:any=[];

  btnSaveShow:boolean=true;
  btnUpdateShow:boolean=false;

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.studentValue = this.formBuilder.group({
      name:[''],
      class:[''],
      email:[''],
      mobile:['']
    })
    this.getStudent();
  }

  AddStudent(){
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.api.postStudent(this.studentObj).subscribe({next: (v) =>{
      console.log(v);
    },
  error: (e) => {
    console.log(e);
    alert('Error')
  },
  complete: () => {
    console.log('Student Records Added !!!');
    alert('Student Records Added Successfull !!!')
    this.getStudent();
    this.studentValue.reset();
  }
  })
  }
  getStudent(){
    this.api.getStudent(0).subscribe(res =>{
      this.studentList = res;
    })
  }

  deleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe({next: (v) =>{
      console.log(v);
    },
  error: (e) => {
    console.log(e);
    alert('Error')
  },
  complete: () => {
    console.log('Student Records Deleted !!!');
    alert('Student Records Deleted Successfully !!!')
    this.getStudent();
  }
    })
  }

  editStudent(data:any){
   this.studentValue.controls["name"].setValue(data.name);
   this.studentValue.controls["class"].setValue(data.class);
   this.studentValue.controls["email"].setValue(data.email);
   this.studentValue.controls["mobile"].setValue(data.mobile);
   this.studentObj.id = data.id;
   this.showUpdate();
  }

  UpdateStudent(){
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.api.putStudent(this.studentObj,this.studentObj.id).subscribe({next: (v) =>{
      console.log(v);
    },
  error: (e) => {
    console.log(e);
    alert('Error')
  },
  complete: () => {
    console.log('Student Records Updated !!!');
    alert('Student Records Updated Successfull !!!')
    this.getStudent();
    this.studentValue.reset();
    this.showSave()
    this.studentObj.id = 0;
  }
  })
  }

  showSave(){
    this.btnSaveShow=true;
    this.btnUpdateShow=false;
  }

  showUpdate(){
    this.btnSaveShow=false;
    this.btnUpdateShow=true;
  }

}
