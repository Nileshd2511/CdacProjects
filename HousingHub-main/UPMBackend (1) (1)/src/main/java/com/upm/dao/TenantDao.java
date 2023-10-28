package com.upm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.upm.entities.RentUtility;
import com.upm.entities.Tenant;
import com.upm.entities.Users;

public interface TenantDao extends JpaRepository<Tenant, Long> {
//	Optional<Tenant> findByStatusAndTenantId(boolean status,Long uId);
	Optional<Tenant> findByTenantId(Long id);
	Tenant findByTenant(Users user);
}
