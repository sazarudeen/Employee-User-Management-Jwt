package com.azar.employee.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azar.employee.model.Technology;
import com.azar.employee.service.SkillService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/skill")
public class SkillController {
	
	@Autowired
	SkillService skillService;
	
	@GetMapping
    public List<Technology> getTechnologysByUser(Principal p) {
        return skillService.getTechnologyByUser(p);
    }
	
	@GetMapping("/flush")
	public boolean flushSkillsInredis(Principal p) {
		return skillService.flushSkillsInRedis(p);
	} 
	
	@GetMapping("/{id}")
    public Technology getTechnologyById(@PathVariable("id") long id) {
        return skillService.getTechnologyById(id);
    }
	
	@PostMapping
    public Technology createTechnology(@RequestBody Technology technology,Principal p){
		return skillService.saveTechnology(technology, p);
	}
	
	@PutMapping
    public Technology updateTechnology(@RequestBody Technology technology,Principal p){
		return skillService.updateTechnology((long)technology.getTechId(),technology, p);
	}
	
	@DeleteMapping("/{id}")
	public List<Technology> deleteTechnology(@PathVariable("id") long id,Principal p){
		return skillService.deleteTechnology(id,p);
	}
	
	

}
