package com.azar.employee.security.util;

import java.util.Base64;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTutil {
	
	@Value("${app.secret}")
	String secretKey;
	
	public String generateToken(String userName) {
		String token = Jwts
						.builder()
						.setId("R4E3")
						.setSubject(userName)//subject means username
						.setIssuer("Azar")
						.setIssuedAt(new Date(System.currentTimeMillis()))
						.setExpiration(new Date(System.currentTimeMillis()+TimeUnit.MINUTES.toMillis(300)))
						.signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encode(secretKey.getBytes()))
						.compact();
		    
		return token;
	}
	
	public Claims getClaims(String jwtToken) {
		try {
			return Jwts.parser()
				    .setSigningKey(Base64.getEncoder().encode(secretKey.getBytes()))
				    .parseClaimsJws(jwtToken)
				    .getBody();
		} catch (Exception e) {
			throw e;
		}
	}
	
	public String getUserName(String token) {
		return getClaims(token).getSubject();
	}
	
	public Date getExpDate(String token) {
		return getClaims(token).getExpiration();
	}
	
	public boolean isTokenExpired(String token) {
		Date expirationDate = getExpDate(token);
		return expirationDate.before(new Date(System.currentTimeMillis()));
	}
	
	public boolean validateToken(String token,String userName) {
		String usernameFromToken = getUserName(token);
		return (userName.equals(usernameFromToken) && !isTokenExpired(token));
	}
	
}
