package com.azar.employee.Exception;

public class JwtTokenExpiredException extends RuntimeException {

    public JwtTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}