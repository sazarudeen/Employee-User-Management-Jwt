package com.azar.employee.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azar.employee.model.User;
import com.azar.employee.model.UserRequest;
import com.azar.employee.model.UserResponse;
import com.azar.employee.service.AuthenticationService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	
	@Autowired
	AuthenticationService authenticationService;

	@PostMapping("/login")
	public ResponseEntity<UserResponse> doLogin(@RequestBody UserRequest userRequest){
		return authenticationService.doLogin(userRequest);
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> doRegister1(@RequestBody User user) {
		return authenticationService.doRegister(user);
	} 
	
	@GetMapping("/get")
	public String doget(Principal p) {
		return "Hello "+p.getName();
	} 
	
	@GetMapping("/admin")
	public String getAdmin(Principal p) {
		return "Hello admin "+p.getName();
	} 

}
