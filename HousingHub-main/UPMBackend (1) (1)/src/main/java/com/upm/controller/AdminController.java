package com.upm.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.upm.dto.AddAdminDto;
import com.upm.dto.AddBuildingDto;
import com.upm.dto.AddOwnerDto;
import com.upm.dto.AddTenantDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.FlatDto;
import com.upm.dto.UpdateProfileDto;
import com.upm.dto.UserDto;
import com.upm.entities.Building;
import com.upm.entities.Flat;
import com.upm.entities.Users;
import com.upm.service.AdminService;
import com.upm.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin( methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, 
allowedHeaders = {"Authorization", "Content-Type"})
@Validated
public class AdminController {
	@Autowired
	private  AdminService adminService;
	
	@Autowired
	private UserService userService;
	
	public AdminController() {
		System.out.println("inside ctor : "+getClass());
	}
	
	
	public AddOwnerDto addOwner(@RequestBody AddOwnerDto ownerDto) {
		return adminService.addOwner(ownerDto);
	}
	
	@PutMapping("/addFlatToOwner/{fid}")
	public ApiResponse addFlatToOwner(@PathVariable Long fid,@RequestBody AddOwnerDto ownerDto) {
		AddOwnerDto owner= addOwner(ownerDto);
		return adminService.addFaltToOwner(fid,owner.getId());
	}
	
	@GetMapping("/buildinglist/{adminId}")
	public List<AddBuildingDto> findAllBuilding(@PathVariable Long adminId)
	{
		return adminService.getBuildingList(adminId);
	}
	
	@GetMapping("/flatlist/{buildingId}")
	public List<FlatDto> findAllFlat(@PathVariable Long buildingId)
	{
		return adminService.getFlatList(buildingId);
	}
	
	@GetMapping("/owner/{flatId}")
	public AddOwnerDto findOwner(@PathVariable Long flatId)
	{
		return adminService.getOwner(flatId);
	}
	
	@GetMapping("/tenant/{flatId}")
	public AddTenantDto findTenant(@PathVariable Long flatId)
	{
		return adminService.getTenant(flatId);
	}
	
	@GetMapping("/ownerlist/{adminId}")
	public List<AddOwnerDto> findAllOwner(@PathVariable Long adminId)
	{
		return adminService.getAllOwnerList(adminId);
	}
	
	@PutMapping("/updateprofile/{userId}")
	public ResponseEntity<?>  updateProfile(@RequestBody UserDto updateProfileDto,@PathVariable Long userId)
	{
		return userService.editProfile(updateProfileDto,userId);
	}
	
	@GetMapping("/emptyflats/{buildingId}")
	public List<FlatDto> findAllEmptyFlatList(@PathVariable Long buildingId)
	{
		return adminService.getAllEmptyFlats(buildingId);
	}
	
	@GetMapping("/flats_owner/{ownerId}")
	public List<FlatDto> flatlist(@PathVariable Long ownerId)
	{
		return adminService.getFlatListByOwner(ownerId);
	}
	
	@GetMapping("/assignflattoexistingowner/{flatId}/{ownerId}")
	public ApiResponse assignFlatToExistingOwner(@PathVariable Long flatId,@PathVariable Long ownerId)
	{
		return adminService.addFaltToOwner(flatId, ownerId);
	}
	


}
