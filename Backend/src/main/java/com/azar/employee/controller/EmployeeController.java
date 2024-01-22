/*
 * package com.azar.employee.controller;
 * 
 * import java.security.Principal; import java.util.List;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.web.bind.annotation.DeleteMapping; import
 * org.springframework.web.bind.annotation.GetMapping; import
 * org.springframework.web.bind.annotation.PathVariable; import
 * org.springframework.web.bind.annotation.PostMapping; import
 * org.springframework.web.bind.annotation.PutMapping; import
 * org.springframework.web.bind.annotation.RequestBody; import
 * org.springframework.web.bind.annotation.RequestMapping; import
 * org.springframework.web.bind.annotation.RestController;
 * 
 * import com.azar.employee.model.Employee; import
 * com.azar.employee.service.EmployeeService;
 * 
 * @RestController
 * 
 * @RequestMapping("/api/employees") public class EmployeeController {
 * 
 * @Autowired private EmployeeService employeeService;
 * 
 * @GetMapping public List<Employee> getAllEmployees() { return
 * employeeService.getAllEmployees(); }
 * 
 * @GetMapping("/{id}") public Employee getEmployeeById(Principal p) { return
 * employeeService.getEmployeeById(p); }
 * 
 * @PostMapping public Employee createEmployee(@RequestBody Employee
 * employee,Principal p) { return employeeService.saveEmployee(employee,p); }
 * 
 * @PutMapping("/{id}") public Employee updateEmployee(@PathVariable Long
 * id, @RequestBody Employee employee) { return
 * employeeService.updateEmployee(id,employee); }
 * 
 * @DeleteMapping("/{id}") public void deleteEmployee(@PathVariable Long id) {
 * employeeService.deleteEmployee(id); } }
 * 
 */