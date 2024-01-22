package com.azar.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.azar.employee.model.User;
import com.azar.employee.repository.UserRepository;

@SpringBootApplication
public class EmployeeManagementApplication implements CommandLineRunner{

	@Autowired
	UserDetailsService detailsServiceImpl;
	
	@Autowired
	UserRepository repository;
	
	public static void main(String[] args) {
		System.setProperty("spring.config.name", "employeeapp");
		SpringApplication.run(EmployeeManagementApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		//System.out.println("Runner getting executed with args "+args);
		
	}

}
