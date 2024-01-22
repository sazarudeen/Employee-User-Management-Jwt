package com.azar.employee.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.azar.employee.model.User;


@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	public UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> opt = userService.getUserByUserName(username);
		
		if (opt.isEmpty()) {
			throw new UsernameNotFoundException("User not found");
		}else{
			User customer = opt.get();
			UserDetails userDetails = org.springframework.security.core.userdetails.User
					.withUsername(customer.getUsername())
					.password(customer.getPassword())
					.roles(customer.getRoles().stream().collect(Collectors.joining(",")))
					.build();
			
			return userDetails;
		}
	}

}
