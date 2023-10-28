package com.upm.service;
import java.util.List;

import com.upm.dto.AddAdminDto;
import com.upm.dto.AddBuildingDto;
import com.upm.dto.AddOwnerDto;
import com.upm.dto.AddTenantDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.FlatDto;
import com.upm.entities.Building;
import com.upm.entities.Flat;
import com.upm.entities.Users;

public interface AdminService {

	public AddOwnerDto addOwner(AddOwnerDto ownerDto);
	public ApiResponse addFaltToOwner(Long id,Long oId);
	public List<AddBuildingDto> getBuildingList(Long adminId);
	public List<FlatDto> getFlatList(Long buildingId);
	public AddOwnerDto getOwner(Long flatId);
	public AddTenantDto getTenant(Long flatId);
	public List<AddOwnerDto> getAllOwnerList(Long adminId);
	public List<FlatDto> getAllEmptyFlats(Long buildingId);
	public List<FlatDto> getFlatListByOwner(Long ownerId);
}
