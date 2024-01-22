package com.azar.employee.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azar.employee.model.ToDo;
import com.azar.employee.service.ToDoService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/todo")
public class ToDoController {
	
	@Autowired
	ToDoService toDoService;
	
	@GetMapping
    public List<ToDo> getToDosByUser(Principal p) {
        return toDoService.getToDosByUser(p);
    }
	
	@GetMapping("/flush")
	public boolean flushTodoInRedis(Principal p) {
		return toDoService.flushToDosInRedis(p);
	} 
	
	@GetMapping("/{id}")
    public ToDo getTodoById(@PathVariable("id") long id) {
        return toDoService.getToDosById(id);
    }
	
	@PostMapping
    public List<ToDo> createToDo(@RequestBody ToDo todo,Principal p){
		return toDoService.saveToDo(todo, p);
	}
	
	@PutMapping("/{id}")
    public List<ToDo> updateToDo(@PathVariable("id") long id,Principal p){
		return toDoService.updateToDo(id, p);
	}
	
	@DeleteMapping("/{id}")
	public List<ToDo> deleteToDo(@PathVariable("id") String id,Principal p){
		return toDoService.deleteToDo(id,p);
	}
	
	

}
