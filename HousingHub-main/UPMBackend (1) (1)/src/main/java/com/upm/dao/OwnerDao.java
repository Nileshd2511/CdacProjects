package com.upm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.entities.Owner;
import com.upm.entities.Tenant;
import com.upm.entities.Users;

public interface OwnerDao extends JpaRepository<Owner, Long> {

	Optional<Owner> findByOwner(Users owner);
//	Optional<Tenant> findByTenant
}
