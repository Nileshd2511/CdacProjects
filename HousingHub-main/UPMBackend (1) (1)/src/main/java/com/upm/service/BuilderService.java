package com.upm.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.upm.dto.AddAdminDto;
import com.upm.dto.AddBuildingDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.LoginDto;
import com.upm.entities.Builder;
import com.upm.entities.Building;
import com.upm.entities.Flat;
import com.upm.entities.Users;

public interface BuilderService {

	ApiResponse addAdmin(AddAdminDto admin,Long builderId);
	
	ApiResponse addBuilding(AddBuildingDto buildingDto,Long builderId);
	
	ApiResponse assignBuildingToAdmin(Long adminId,Long buildingId);
	
	ResponseEntity<?>  removeBuilding(Long buildingId);
		
	ResponseEntity<?> addFlat(Flat flat,Long builddingId);

	List<AddBuildingDto> getBuildingList(Long builderId);

	List<AddAdminDto> getAdminList(Long builderId);

	AddBuildingDto getBuildingDetails(Long buildingId);
}
