package com.azar.employee.service;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.azar.employee.model.Employee;
import com.azar.employee.repository.EmployeeRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public List<Employee> getAllEmployees() {
		log.info("Entering into getAllEmployees");
		try {
			return employeeRepository.findAll();
		} catch (Exception e) {
			throw new RuntimeException("Could not fetch all the Employees", e);
		}
	}

	public Employee getEmployeeByName(Principal p) {
		log.info("Entering into getAllEmployeeByName = " + p.getName());
		try {
			return employeeRepository.findByEmployeeName(p.getName());
		} catch (Exception e) {
			throw new RuntimeException("Could not fetch all the Employees", e);
		}
	}

	public Employee saveEmployee(Employee employee,Principal p) {
		log.info("Entering into saveEmployee");
		try {
			employee.setEmployeeName(p.getName());
			return employeeRepository.save(employee);
		} catch (Exception e) {
			throw new RuntimeException("Could not fetch all the Employees", e);
		}
	}

	public Employee updateEmployee(Long id, Employee employeeToBeupdated) {
		log.info("Entering into update Employee with id = " + id);
		Employee employee = null;
		try {
			employee = employeeRepository.findById(id)
					.orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
		} catch (Exception e) {
			throw new RuntimeException("Could not fetch all the Employees", e);
		}
		employeeRepository.save(employeeToBeupdated);
		return employeeToBeupdated;
	}

	public boolean deleteEmployee(Long id) {
		log.info("Entering into delete Employee with id = " + id);
		try {
			employeeRepository.deleteById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			throw new RuntimeException("Could not fetch all the Employees", e);
		}
	}
}
