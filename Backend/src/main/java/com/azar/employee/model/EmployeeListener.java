package com.azar.employee.model;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Component
public class EmployeeListener {

    @PrePersist
    public void prePersist(Employee employee) {
        LocalDateTime now = LocalDateTime.now();
        employee.setCreatedDate(now);
        employee.setLastModifiedDate(now);
    }

    @PreUpdate
    public void preUpdate(Employee employee) {
        employee.setLastModifiedDate(LocalDateTime.now());
    }
}

