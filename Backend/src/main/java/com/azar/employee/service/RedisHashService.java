package com.azar.employee.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RedisHashService {

	@Autowired
    private RedisTemplate<String, String> redisTemplate;
	
	private static long TTL_DURATION_IN_DAYS = 1;
	
	@Autowired
    private ObjectMapper objectMapper;

    public void pushDataInRedis(String key, String field, Object value) throws JsonProcessingException {
    	try {
    		String jsonValue = objectMapper.writeValueAsString(value);
    		redisTemplate.opsForHash().put(key, field, jsonValue);
    		redisTemplate.expire(key,TTL_DURATION_IN_DAYS,TimeUnit.DAYS);
		} catch (Exception e) {
			log.error("Exception occured while setting data in redis :::",e);
		}
    }

    public <T> T getDataFromRedis(String key, String field, Class<T> valueType) throws IOException {
    	try {
    		String jsonValue = (String) redisTemplate.opsForHash().get(key, field);
    		return jsonValue != null ? objectMapper.readValue(jsonValue, valueType) : null;
		} catch (Exception e) {
			log.error("Exception occured while getting data from redis :::",e);
		}
		return null;
    }

    public boolean flushKey(String key, String field) {
    	try {
    		redisTemplate.opsForHash().delete(key, field);
		} catch (Exception e) {
			return false;
		}
    	return true;
    }
    
    public boolean isDataExistsInRedis(String key, String field) {
    	try {
    		return redisTemplate.opsForHash().hasKey(key, field);
		} catch (Exception e) {
			return false;
		}
    }
}
