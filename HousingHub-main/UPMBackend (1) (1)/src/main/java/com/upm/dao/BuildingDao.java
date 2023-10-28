package com.upm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.entities.Admin;
import com.upm.entities.Builder;
import com.upm.entities.Building;

public interface BuildingDao extends JpaRepository<Building, Long> {

	List<Building> findByBuildingBuilder(Builder builder);
	
	List<Building> findByAdminsBuilding(Admin admin);
}
