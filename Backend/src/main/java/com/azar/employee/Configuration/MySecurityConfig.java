package com.azar.employee.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.azar.employee.security.filter.JwtAuthFilter;
import com.azar.employee.service.CustomUserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled=true,prePostEnabled=true,jsr250Enabled=true)
public class MySecurityConfig {
		
	@Autowired
	CustomUserDetailsServiceImpl customUserDetailsServiceImpl;
	
	@Autowired
	JwtAuthFilter jwtAuthFilter;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
		.cors() // Enable CORS
		.and()
		.authorizeHttpRequests()
        .requestMatchers("/login").permitAll()
		.requestMatchers("/api/v1/auth/login","/api/v1/auth/register").permitAll()
		.requestMatchers("/api/v1/auth/admin").hasRole("admin")
		.anyRequest().authenticated()
		.and()
		.formLogin()
		.defaultSuccessUrl("/home",true)
		.and()
		.httpBasic()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		
		http.httpBasic(Customizer.withDefaults());
		  http.csrf(c->c.disable());
		return http.build();
	}
	
	
	@Bean
	public AuthenticationManager authManager(@Autowired PasswordEncoder passwordEncoder) {
		DaoAuthenticationProvider daoprovider = new DaoAuthenticationProvider();
		daoprovider.setPasswordEncoder(passwordEncoder);
		daoprovider.setUserDetailsService(customUserDetailsServiceImpl);
		return new ProviderManager(daoprovider);
	}
	

	
	
	
	

}
