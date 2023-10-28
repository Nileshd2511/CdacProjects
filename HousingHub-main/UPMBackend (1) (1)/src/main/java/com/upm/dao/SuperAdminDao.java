package com.upm.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.entities.SuperAdmin;

public interface SuperAdminDao extends JpaRepository<SuperAdmin, Long> {

	Optional<SuperAdmin> findByEmailId(String emailId);
}
