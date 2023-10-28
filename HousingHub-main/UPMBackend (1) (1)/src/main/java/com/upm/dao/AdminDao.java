package com.upm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.entities.Admin;
import com.upm.entities.Builder;
import com.upm.entities.Building;
import com.upm.entities.Users;
public interface AdminDao extends JpaRepository<Admin, Long> {

	List<Admin> findByAdminBuilder(Builder builder);

	Admin findByAdmin(Users user);
}
