package com.upm.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.upm.dto.AddBuilderDto;
import com.upm.entities.SuperAdmin;

public interface SuperAdminService {

	ResponseEntity<?> addBuilder(AddBuilderDto addBuilderDto);

	List<SuperAdmin> getAllSuperAdminList();

}
