package com.azar.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azar.employee.model.User;
import com.azar.employee.service.AuthenticationService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
	
	@Autowired
	AuthenticationService authenticationService;
	
	@PostMapping
	public ResponseEntity<User> doRegister1(@RequestBody User user) {
		return authenticationService.doRegister(user);
	} 
	
	@GetMapping
	public List<User> getAll() {
		return authenticationService.getAllUsers();
	} 
	
	@GetMapping("/flush")
	public boolean flushUsersInredis() {
		return authenticationService.flushUserInredis();
	} 
	
	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		return authenticationService.updateUser(user);
	}
	
	@DeleteMapping("/{id}")
	public boolean deleteUser(@PathVariable("id") Integer id) {
		return authenticationService.deleteUser(id);
	}

}
