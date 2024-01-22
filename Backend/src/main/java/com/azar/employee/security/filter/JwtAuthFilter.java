package com.azar.employee.security.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.azar.employee.Exception.JwtTokenExpiredException;
import com.azar.employee.security.util.JWTutil;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

	@Autowired
	JWTutil jwTutil;

	@Autowired
	UserDetailsService detailsService;

	@Autowired
	PasswordEncoder encoder;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException,JwtTokenExpiredException {

		String token = request.getHeader("Authorization");

		if (token != null) {
           
			String usernameFromToken = null;
			
			try {
			    usernameFromToken = jwTutil.getUserName(token.substring(7));
			} catch (ExpiredJwtException e) {
			    log.error("JWT Token Expired. Please Login Again", e.getMessage());
			    throw new JwtTokenExpiredException("Jwt Token Expired", e);
			}


			if (usernameFromToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = null;
				try {
					userDetails = loadUserDetailsByUser(usernameFromToken);
				} catch (Exception e) {
					throw e;
				}
				// validate token

				boolean isTokenValid = jwTutil.validateToken(token.substring(7), userDetails.getUsername());

				if (isTokenValid) {
					List<SimpleGrantedAuthority> authorities = new ArrayList<>();
					String roles = StringUtils.substringBetween(userDetails.getAuthorities().toString(), "[", "]");
					if (roles != null) {
						for (String role : roles.split(",")) {
							authorities.add(new SimpleGrantedAuthority(StringUtils.prependIfMissing(role, "ROLE_")));
						}
					}
					UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
							usernameFromToken, userDetails.getPassword(), authorities);

					authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

					SecurityContextHolder.getContext().setAuthentication(authToken);
					response.setHeader("Authorization", "Bearer " + token.substring(7));
				}

			}
		}

		filterChain.doFilter(request, response);

	}

	public boolean isAdminUser(String userName) {
		UserDetails currentUser = loadUserDetailsByUser(userName);
		if (currentUser != null) {
			return currentUser.getAuthorities().toString().contains("admin");
		}
		return false;
	}

	public boolean isPasswordMatchesForUserName(String userName, String passWord) {
		UserDetails userDetails = null;
		try {
			if (userName != null) {
				userDetails = loadUserDetailsByUser(userName);
				return encoder.matches(passWord, userDetails.getPassword());
			}
		} catch (Exception e) {
			log.error("User "+userName+" not found ",e);
			throw new UsernameNotFoundException("User "+userName+" not found ");
		}
		return false;
	}

	private UserDetails loadUserDetailsByUser(String userName) {
		UserDetails userDetails = null;
		try {
			userDetails = detailsService.loadUserByUsername(userName);
		} catch (Exception e) {
			throw e;
		}
		return userDetails;
	}

	@PostConstruct
	public void init() {
		// it will be called after this jwtauthfilter bean is created or constructed
		// inside context
		// System.out.println("Jwt Auth filter component is initiallized in factory");
	}

	@PreDestroy
	public void destroy() {
		// it will be called if the server is stoopped
		System.out.println("Jwt Auth filter component is destroyed in factory");
	}

}
