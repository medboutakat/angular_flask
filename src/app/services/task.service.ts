import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  delete(id) { 
    return this.http.delete("http://localhost:3000/tasks/"+id);
  }

  constructor(private http: HttpClient) { }

findAll(){
return this.http.get("http://localhost:3000/tasks");
}

add(data){
  return this.http.post("http://localhost:3000/tasks",data);
}
update(data){
  return this.http.put("http://localhost:3000/tasks/"+data.id,data);
}
  

}
