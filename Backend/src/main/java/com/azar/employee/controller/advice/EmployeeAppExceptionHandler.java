package com.azar.employee.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.azar.employee.Exception.JwtTokenExpiredException;
import com.azar.employee.model.ErrorType;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class EmployeeAppExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorType> exceptionClassHandler(Exception e){
		log.error("Exception occured in exceptionClassHandler method..",e);
		ErrorType error = ErrorType.builder()
				               .message(e.getMessage())
				               .code(HttpStatus.INTERNAL_SERVER_ERROR.toString())
//				               .trace(e.getStackTrace())
				               .classType("Exception")
				               .build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ErrorType> runTimeExceptionClassHandler(RuntimeException e){
		log.error("Exception occured in runTimeExceptionClassHandler method..",e);
		ErrorType error = ErrorType.builder()
				               .message(e.getMessage())
				               .code(HttpStatus.INTERNAL_SERVER_ERROR.toString())
//				               .trace(e.getStackTrace())
				               .classType("RunTime Exception")
				               .build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}
	
	@ExceptionHandler(JwtTokenExpiredException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorType> jwtTokenExpiredExceptionHandler(JwtTokenExpiredException ex) {
		log.error("Exception occured in jwtTokenExpiredExceptionHandler method..",ex);
		ErrorType error = ErrorType.builder()
	               .message(ex.getMessage())
	               .code(HttpStatus.INTERNAL_SERVER_ERROR.toString())
	               .classType("Exception")
	               .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
	
	
	@ExceptionHandler(UsernameNotFoundException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<ErrorType> userNameNotFoundExceptionHandler(UsernameNotFoundException ex) {
		log.error("Exception occured in userNameNotFoundExceptionHandler method..",ex);
		ErrorType error = ErrorType.builder()
				.message(ex.getMessage())
				.code(HttpStatus.INTERNAL_SERVER_ERROR.toString())
				.classType("UsernameNotFoundException")
				.build();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}

}
