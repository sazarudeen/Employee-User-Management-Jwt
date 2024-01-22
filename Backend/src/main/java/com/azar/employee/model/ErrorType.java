package com.azar.employee.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorType {
	
	
	private String message;
	private String code;
//	private StackTraceElement[] trace;
	private String classType;

}
