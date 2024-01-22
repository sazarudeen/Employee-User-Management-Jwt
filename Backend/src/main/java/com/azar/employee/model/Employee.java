package com.azar.employee.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@SuppressWarnings("unused")
@Entity
@Table(name = "employee_table")
@Data
@Builder
@EntityListeners(value = EmployeeListener.class)
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int employeeId;
	@Column(unique = true)
	private String employeeName;
	private String firstName;
    private String lastName;
    private double salary;
    private LocalDate dateOfBirth;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;
    private String gender;
    private String email;
    private String phoneNumber;
    private String address;
    private String description;
    private LocalDate dateOfJoining;
}
