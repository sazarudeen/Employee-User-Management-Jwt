package com.azar.employee.service;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.azar.employee.model.ToDo;
import com.azar.employee.repository.ToDoRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ToDoService {

	@Autowired
	private ToDoRepository toDoRepository;

	@Autowired
	private RedisHashService redisService;

	private final static String TODO_REDIS_KEY = "ToDo";

	public List<ToDo> getToDosByUser(Principal p) {
		log.info("Entering into getToDosByUser");
		try {
			if (redisService.isDataExistsInRedis(TODO_REDIS_KEY, p.getName())) {
				List<ToDo> toDos = redisService.getDataFromRedis(TODO_REDIS_KEY, p.getName(), List.class);
				log.info("ToDos loaded from redis");
				return toDos;
			} else {
				List<ToDo> toDos = toDoRepository.findByUserName(p.getName());
				redisService.pushDataInRedis(TODO_REDIS_KEY, p.getName(), toDos);
				log.info("ToDos loaded from Database");
				return toDos;
			}
		} catch (Exception e) {
			log.error("Error fetching ToDos", e);
			throw new RuntimeException("Could not fetch all the ToDos", e);
		}
	}
	
	public boolean flushToDosInRedis(Principal p) {
	    log.info("Flushing ToDos in Redis");
	    try {
	        redisService.flushKey(TODO_REDIS_KEY, p.getName());
	        return true;
	    } catch (Exception e) {
	        log.error("Exception occurred while flushing ToDos from Redis for user ",p.getName(), e);
	    }
	    return false;
	}


	public ToDo getToDosById(long id) {
		log.info("Entering into getToDosById");
		try {
			return toDoRepository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found with id: " + id));
		} catch (Exception e) {
			log.error("Error fetching ToDo by id: {}", id, e);
			throw new RuntimeException("Could not fetch ToDo by id: " + id, e);
		}
	}

	public List<ToDo> saveToDo(ToDo todo, Principal p) {
		log.info("Entering into saveToDo");
		try {
			todo.setUserName(p.getName());
			toDoRepository.save(todo);
			redisService.flushKey(TODO_REDIS_KEY, p.getName());
			List<ToDo> updatedToDos = getToDosByUser(p);
			log.info("ToDo saved successfully");
			return updatedToDos;
		} catch (Exception e) {
			log.error("Error saving ToDo", e);
			throw new RuntimeException("Could not save the ToDo", e);
		}
	}

	public List<ToDo> updateToDo(Long id, Principal p) {
		log.info("Entering into update ToDo with id = {}", id);
		try {
			ToDo toDo = toDoRepository.findById(id)
					.orElseThrow(() -> new RuntimeException("ToDo not found with id: " + id));
			toDo.setFinished(!toDo.isFinished());
			List<ToDo> updatedToDos = saveToDo(toDo, p);
			log.info("ToDo updated successfully");
			return updatedToDos;
		} catch (Exception e) {
			log.error("Error updating ToDo with id: {}", id, e);
			throw new RuntimeException("Could not update the ToDo", e);
		}
	}

	
	public List<ToDo> deleteToDo(String id, Principal p) {
		log.info("Entering into delete ToDo with id = {}", id);
		try {
			toDoRepository.deleteById(Long.parseLong(id));
			redisService.flushKey(TODO_REDIS_KEY, p.getName());
			List<ToDo> updatedToDos = getToDosByUser(p);
			log.info("ToDo deleted successfully");
			return updatedToDos;
		} catch (Exception e) {
			log.error("Error deleting ToDo with id: {}", id, e);
			throw new RuntimeException("Could not delete the ToDo with id " + id, e);
		}
	}
}
