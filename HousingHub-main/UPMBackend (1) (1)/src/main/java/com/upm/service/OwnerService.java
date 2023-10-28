package com.upm.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.upm.dto.AddTenantDto;
import com.upm.dto.AddUtilityDto;
import com.upm.dto.ApiResponse;
import com.upm.entities.Flat;
import com.upm.dto.AddTenantDto;
import com.upm.dto.FlatDto;

public interface OwnerService {
	public AddTenantDto addTenant(AddTenantDto tenantDto);
	
	public ResponseEntity<?> assignFlatToTenant(Long id, Long tId);

	public ApiResponse assignUtilityToTenant(Long fId, Long tId, AddUtilityDto addUtilityDto);

	public AddTenantDto getTenantInfo(Long flatId);

	public FlatDto getFlatInfo(Long flatId);

	public List<AddTenantDto> getTenantInfoByOwnerId(Long ownerId);

	public List<AddUtilityDto> getUtilityListOfFlat(Long flatId);
}
