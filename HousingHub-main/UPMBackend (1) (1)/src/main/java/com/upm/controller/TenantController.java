package com.upm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.upm.dto.AddUtilityDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.UpdateProfileDto;
import com.upm.dto.UserDto;
import com.upm.service.TenantService;
import com.upm.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/tenant")
@Validated
public class TenantController {

	@Autowired
	private UserService userService;

	@Autowired
	private TenantService tenantService;

	public TenantController() {
		System.out.println("in ctor : " + getClass());
	}

	@PutMapping("/rentPayment/{id}")
	public ResponseEntity<?> rentPayment(@PathVariable Long id) {
		return tenantService.updateRentStatus(false, id);
	}
	
	@GetMapping("/getUtilityByUtilityId/{utilityId}")
	public AddUtilityDto getUtilityByUtilityId (@PathVariable Long utilityId) {
		return tenantService.getUtilityByUtilityId(utilityId);
	}

	@PutMapping("/updateprofile/{userId}")
	public ResponseEntity<?> updateProfile(@RequestBody UserDto updateProfileDto, @PathVariable Long userId) {
		return userService.editProfile(updateProfileDto, userId);
	}
	
	@GetMapping("/getUtilityListOfTenant/{tid}")
	public List<AddUtilityDto>  getUtilityListOfTenant ( @PathVariable Long tid) {
		return tenantService.getUtilityListOfTenant(tid);
	}
}
