package com.upm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.entities.RentUtility;

public interface UtilityDao extends JpaRepository<RentUtility, Long> {
	Optional<RentUtility> findByTenantUtilityId(Long id);
	Optional<RentUtility> findByBillStatusAndId(boolean status,Long uid);
}
