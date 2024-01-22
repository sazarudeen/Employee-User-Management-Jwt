package com.azar.employee.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.azar.employee.model.User;
import com.azar.employee.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;
    
    public static Map<String,User> usersMap = new HashMap<>();

    @Autowired
    public PasswordEncoder encoder;

    public Integer saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        log.info("User saved successfully with id: {}", savedUser.getId());
        return savedUser.getId();
    }

    public User updateUser(User user) {
        try {
            Optional<User> optionalUser = userRepository.findById(user.getId());
            if (optionalUser.isPresent()) {
                User userToBeUpdated = optionalUser.get();
                userToBeUpdated.setUsername(user.getUsername());
                userToBeUpdated.setPassword(encoder.encode(user.getPassword()));
                userToBeUpdated.setRoles(user.getRoles());
                userRepository.save(userToBeUpdated);
                usersMap.put(user.getUsername(), userToBeUpdated);
                log.info("User updated successfully with id: "+ userToBeUpdated.getId());
                return userToBeUpdated;
            } else {
                throw new UsernameNotFoundException("User " + user.getUsername() + " not found.");
            }
        } catch (Exception e) {
            log.error("Exception occurred while updating user", e);
            return null;
        }
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        log.info("Retrieved users from the database"+ users.size());
        return users;
    }

    public boolean deleteUser(Integer id) {
        try {
            userRepository.deleteById(id);
            deleteUserFromMapById(id);
            log.info("User deleted successfully with id: "+ id);
            return true;
        } catch (Exception e) {
            log.error("Exception occurred while deleting user with id: "+ id, e);
            return false;
        }
    }


    public Optional<User> getUserByUserName(String userName) {
        Optional<User> user = null;
        if(usersMap.containsKey(userName)) {
        	user = Optional.of(usersMap.get(userName));
        }else {
        	user = userRepository.findByUsername(userName);
        }
        if (user.isPresent()) {
        	usersMap.put(userName, user.get());
            log.info("Retrieved user by username: "+ userName);
        } else {
            log.warn("User not found with username: "+ userName);
        }
        return user;
    }
    
    private void deleteUserFromMapById(Integer id) {
    	Iterator<Map.Entry<String, User>> iterator = usersMap.entrySet().iterator();
    	while (iterator.hasNext()) {
    		Map.Entry<String, User> entry = iterator.next();
    		if (entry.getValue().getId().equals(id)) {
    			iterator.remove();
    		}
    	}
    }
}
