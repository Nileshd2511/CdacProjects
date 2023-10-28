package com.upm.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.upm.custom_exceptions.ResourceNotFoundException;
import com.upm.dao.AdminDao;
import com.upm.dao.SuperAdminDao;
import com.upm.dao.UsersDao;
import com.upm.dto.UpdateProfileDto;
import com.upm.entities.Admin;
import com.upm.entities.Builder;
import com.upm.entities.Owner;
import com.upm.entities.SuperAdmin;
import com.upm.entities.Tenant;
import com.upm.entities.Users;
import com.upm.dto.AddAdminDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.LoginDto;
import com.upm.dto.UserDto;

@Transactional
@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UsersDao userDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private SuperAdminDao superAdminDao;
	
	@Autowired
	private PasswordEncoder encoder;
	
	
	
	@Override
	public ResponseEntity<?> editProfile(UserDto updateProfileDto,Long userId) {
		Users user=userDao.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid user id!!"));
		Admin admin=user.getAdmin();
		Tenant tenant=user.getTenant();
		Builder builder=user.getBuilder();
		Owner owner=user.getOwner();
		Users u=mapper.map(updateProfileDto, Users.class);
		u.setId(userId);
		u.setAdmin(admin);
		u.setBuilder(builder);
		u.setTenant(tenant);
		u.setOwner(owner);
		u.setPassword(encoder.encode(updateProfileDto.getPassword()));
		userDao.save(u);
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("profile updated successfully"));
	}
	@Override
	public UserDto loginUser(LoginDto loginDto) {
		Users user1 = userDao.findByEmailId(loginDto.getEmailId()).orElseThrow(()->new ResourceNotFoundException("Invalid user Email id!!"));
		UserDto user = mapper.map(user1,UserDto.class);
		System.out.println(encoder.matches(loginDto.getPassword(),user1.getPassword()));
		if (encoder.matches(loginDto.getPassword(),user1.getPassword())) {
			return user;	
		} else
			throw new ResourceNotFoundException("User Not found!! Login unsuccessful!!");
	}

	@Override
	public SuperAdmin superAdminLoginService(SuperAdmin superAdmin) {
		SuperAdmin superadmin =superAdminDao.findByEmailId(superAdmin.getEmailId()).orElseThrow(()->new ResourceNotFoundException("Invalid credentials!!"));
		System.out.println(superadmin.getEmailId());

		if(superadmin.getPassword().equals(superadmin.getPassword()))
		    return superadmin;
		else
			 throw new ResourceNotFoundException("Invalid Credentials!!");
	}
	@Override
	public UserDto getLoggedInUser(Long userId) {
		Users user = userDao.findById(userId).orElseThrow(()->new ResourceNotFoundException("Invalid user id!!"));	
		UserDto userDto = mapper.map(user, UserDto.class);
		System.out.println(userDto.getPassword());
		System.out.println(userDto.getEmailId());
		return userDto;
	}
	
	@Override
	public ResponseEntity<String> changeUserPassword(String email, String oldPassword, String newPassword) {
		Users user = userDao.findByEmailId(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Email Id !!!!"));

		if (encoder.matches(oldPassword, user.getPassword()) && user != null) {
			user.setPassword(encoder.encode(newPassword));
			userDao.save(user);
			return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully.");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("You have entered the wrong current password. Please double-check your password and try again");
	}
	
}
