import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  tasks: any;
  mainForm: FormGroup;
  constructor(private taskService: TaskService) {

    this.load();
    this.mainForm = this.createFormGroup()
  }
  load() {
    this.taskService.findAll().subscribe(x => {
      this.tasks = x;
    });
  }

  createFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      label: new FormControl(),
      completed: new FormControl()
    });
  }

  ngOnInit() {
  }

  onSubmit() { 
    var data = this.mainForm.value 

    console.log("data", data)
    var selectedData =  this.tasks.find(t => t.id === data.id); 
    console.log('old object',selectedData);
    var method = selectedData!=null ? 'update' : "add"; 

    this.taskService[method](data).subscribe(x => {
      console.log("success", data); 
      this.load();
    }); 

  }

  edit(selectedData) {
    this.mainForm.setValue(selectedData);
  }


  delete(id){
    this.taskService.delete(id).subscribe(x => { 
      this.load();
    }); 
  }
  revert() {
    this.mainForm.reset();
  }
  //shif + alt + F      
  somme(a: number, b: number): number {
    return a + b;
  }
}
