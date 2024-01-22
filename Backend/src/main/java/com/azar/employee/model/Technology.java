package com.azar.employee.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "skills_table")
@Data
public class Technology {
  
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int techId;
	
	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "tech_name")
	private String technologyName;
	
	@Column(name = "tech_type")
	private String type;
	
	@Column(name = "progress")
	private String learningProgress;
	
	
	
}
