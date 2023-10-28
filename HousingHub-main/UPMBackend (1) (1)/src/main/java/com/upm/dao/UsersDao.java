package com.upm.dao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.upm.entities.Role;
import com.upm.entities.Users;

public interface UsersDao extends JpaRepository<Users, Long> {
	Optional<Users> findByEmailId(String email);
}
