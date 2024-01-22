package com.azar.employee.service;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.azar.employee.model.User;
import com.azar.employee.model.UserRequest;
import com.azar.employee.model.UserResponse;
import com.azar.employee.security.filter.JwtAuthFilter;
import com.azar.employee.security.util.JWTutil;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthenticationService {

	@Autowired
	private JWTutil jwTutil;

	@Autowired
	private JwtAuthFilter jwtAuth;

	@Autowired
	private UserService userService;

	@Autowired
	private RedisHashService redisService;

	private final static String USERS_REDIS_KEY = "Users";
	
	private final static String USERS_KEY = "allUsers";

	public ResponseEntity<UserResponse> doLogin(@RequestBody UserRequest userRequest) throws UsernameNotFoundException{
		Boolean isAdminUser = false;
		String token = null;
		log.info("Entering into doLogin for user :::", userRequest.getUserName());
		try {
			if (jwtAuth.isPasswordMatchesForUserName(userRequest.getUserName(), userRequest.getPassword())) {
				token = jwTutil.generateToken(userRequest.getUserName());
				isAdminUser = jwtAuth.isAdminUser(userRequest.getUserName());
				log.info("Token generated successfully for user ::: "+ userRequest.getUserName());
				return ResponseEntity.ok(new UserResponse(token, "Token generated successfully", isAdminUser));
			} else {
				log.error("Invalid credentials for user :::", userRequest.getUserName());
				return ResponseEntity.ok(new UserResponse(null, "Invalid Credentials", isAdminUser));
			}
		} catch (Exception e) {
			log.error("Exception occurred while login for user :::", userRequest.getUserName(), e);
			throw e;
		}
	}

	public ResponseEntity<User> doRegister(@RequestBody User user) {
		log.info("Entering into doRegister method for user :::", user.getUsername());
		try {
			userService.saveUser(user);
			redisService.flushKey(USERS_REDIS_KEY, USERS_KEY);
		} catch (Exception e) {
			log.error("Exception occurred while saving user :::", user.getUsername(), e);
			throw e;
		}
		return ResponseEntity.ok(user);
	}

	public ResponseEntity<User> updateUser(@RequestBody User user) {
		log.info("Entering into updateUser method for user :::", user.getUsername());
		try {
			userService.updateUser(user);
			redisService.flushKey(USERS_REDIS_KEY, USERS_KEY);
		} catch (Exception e) {
			log.error("Exception occurred while updating user :::", user.getUsername(), e);
			throw e;
		}
		return ResponseEntity.ok(user);
	}
	
	public boolean flushUserInredis() {
		log.info("Flushing users in redis ");
		try {
			redisService.flushKey(USERS_REDIS_KEY, USERS_KEY);
			return true;
		} catch (Exception e) {
			log.error("Exception occured in flushing users from redis ");
		}
		return false;
	}

	public boolean deleteUser(Integer id) {
		log.info("Entering into deleteUser method for user with id ::: "+id);
		try {
			boolean isDeleted = userService.deleteUser(id);
			if (isDeleted) {
				redisService.flushKey(USERS_REDIS_KEY, USERS_KEY);
			}
			return isDeleted;
		} catch (Exception e) {
			log.error("Exception occurred while deleting user :::", e);
			throw e;
		}
	}

	public List<User> getAllUsers() {
		log.info("Entering into getAllUsers method");
		try {
			if (redisService.isDataExistsInRedis(USERS_REDIS_KEY, USERS_KEY)) {
				List<User> users = redisService.getDataFromRedis(USERS_REDIS_KEY,USERS_KEY, List.class);
				log.info("Users loaded from redis");
				return users;
			} else {
				List<User> users = userService.getAllUsers();
				redisService.pushDataInRedis(USERS_REDIS_KEY,USERS_KEY,users);
				log.info("Users loaded from Database");
				return users;
			}
		} catch (Exception e) {
			log.error("Exception occurred while getting all users", e);
		}
		return Collections.emptyList();
	}
}
