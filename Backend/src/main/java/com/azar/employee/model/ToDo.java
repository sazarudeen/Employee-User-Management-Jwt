package com.azar.employee.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "to-do-table")
@Data
public class ToDo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int toDoId;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "to-do-name")
	private String toDoName;
	
	@Column(name = "to-do-done")
	private boolean finished;
	
}
