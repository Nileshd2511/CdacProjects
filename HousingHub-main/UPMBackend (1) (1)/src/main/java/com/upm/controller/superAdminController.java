package com.upm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.upm.dto.AddBuilderDto;
import com.upm.entities.SuperAdmin;
import com.upm.service.SuperAdminService;
import com.upm.service.SuperAdminServiceImpl;

@RestController
@RequestMapping("/superadmin")
@CrossOrigin( methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, 
allowedHeaders = {"Authorization", "Content-Type"})
//@Validated
public class superAdminController {
	
	@Autowired
	private SuperAdminService superAdminService;
	
	@PostMapping("/addBuilder")
	public ResponseEntity<?> addBuilder(@RequestBody AddBuilderDto addBuilderDto)
	{
		return superAdminService.addBuilder(addBuilderDto);
	}
	
	@GetMapping("/superadminlist")
	public List<SuperAdmin> findAllSuperAdmin()
	{
		return superAdminService.getAllSuperAdminList();
	}

}
