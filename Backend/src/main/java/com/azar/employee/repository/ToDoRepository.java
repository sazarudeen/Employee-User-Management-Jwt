package com.azar.employee.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.azar.employee.model.Technology;
import com.azar.employee.model.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
	
	@Query(value = "select * from [to-do-table] t where t.user_name = ?1",nativeQuery = true)
	List<ToDo> findByUserName(String userName);
	
}

