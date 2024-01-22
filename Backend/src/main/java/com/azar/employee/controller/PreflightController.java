package com.azar.employee.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class PreflightController {
	
	@RequestMapping(method = RequestMethod.OPTIONS)
	public String optionLogin() {
		return "Acknowledged";
		
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String getLogin() {
		return "Acknowledged";
	}
   
}
