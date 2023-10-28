package com.upm.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.upm.dto.AddUtilityDto;
import com.upm.dto.ApiResponse;

public interface TenantService {
//	String updateRent(boolean status,Long userId);
	
	ResponseEntity<?> updateRentStatus(boolean status,Long uid);
	
	List<AddUtilityDto>  getUtilityListOfTenant(Long tid);
	
	public AddUtilityDto getUtilityByUtilityId (Long utilityId);
}
