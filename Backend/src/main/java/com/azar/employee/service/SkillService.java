package com.azar.employee.service;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.azar.employee.model.Technology;
import com.azar.employee.repository.SkillRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SkillService {

	@Autowired
	private SkillRepository skillRepository;
	
	@Autowired
	private RedisHashService redisService;
	
	private final static String SKILLS_REDIS_KEY = "Skills";

	public List<Technology> getTechnologyByUser(Principal p) {
		List<Technology> technologies = null;
		log.info("Entering into getAllTechnology");
		try {
			if(redisService.isDataExistsInRedis(SKILLS_REDIS_KEY,p.getName())) {
				technologies = redisService.getDataFromRedis(SKILLS_REDIS_KEY,p.getName(),List.class);
				log.info("Skills loaded from redis");
			}else {
				technologies = skillRepository.findByUserName(p.getName());
				redisService.pushDataInRedis(SKILLS_REDIS_KEY,p.getName(),technologies);
				log.info("Skills loaded from Database");
			}
		} catch (Exception e) {
			throw new RuntimeException("Unable to fetch all the Technology's", e);
		}
		return technologies;
	}

	public Technology getTechnologyById(long id) {
		log.info("Entering into getAllTechnology");
		Technology technology = null;
		try {
			technology = skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Technology not found with id: " + id));
		} catch (Exception e) {
			throw new RuntimeException("Unable to fetch all the Technology", e);
		}
		return technology;
	}
	
	public boolean flushSkillsInRedis(Principal p) {
	    log.info("Flushing Skills in Redis for user: {}", p.getName());
	    try {
	        redisService.flushKey(SKILLS_REDIS_KEY, p.getName());
	        return true;
	    } catch (Exception e) {
	        log.error("Exception occurred while flushing Skills from Redis for user: {}", p.getName(), e);
	    }
	    return false;
	}


	public Technology saveTechnology(Technology technology, Principal p) {
		log.info("Entering into saveTechnology");
		List<Technology> technologies = null;
		try {
			technology.setUserName(p.getName());
			skillRepository.save(technology);
			log.info("skill "+technology.getTechnologyName()+" got saved ");
			redisService.flushKey(SKILLS_REDIS_KEY, p.getName());
			technologies = getTechnologyByUser(p);
			redisService.pushDataInRedis(SKILLS_REDIS_KEY,p.getName(),technologies);
			log.info("Updated latest skills has been pushed to redis");
			return technology;
		} catch (Exception e) {
			throw new RuntimeException("Unable to save the Technology", e);
		}
	}

	public Technology updateTechnology(Long id, Technology technologyToBeupdated, Principal p) {
		log.info("Entering into update Technology with id = " + id);
		Technology technology = null;
		try {
			technology = skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Technology not found with id: " + id));
			technology.setTechnologyName(technologyToBeupdated.getTechnologyName());
			technology.setLearningProgress(technologyToBeupdated.getLearningProgress());
			technology.setType(technologyToBeupdated.getType());
			technology.setUserName(p.getName());
		} catch (Exception e) {
			throw new RuntimeException("Unable to update the Technology", e);
		}
		return saveTechnology(technology, p);
	}

	public List<Technology> deleteTechnology(long id,Principal p) {
		log.info("Entering into delete Technology with id = " + id);
		try {
			skillRepository.deleteById(id);
			redisService.flushKey(SKILLS_REDIS_KEY, p.getName());
			return getTechnologyByUser(p);
		} catch (Exception e) {
			throw new RuntimeException("Unable to delete the Technology with id "+id, e);
		}
	}
}
