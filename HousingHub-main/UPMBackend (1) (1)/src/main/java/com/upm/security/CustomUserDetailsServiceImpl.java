package com.upm.security;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.upm.dao.*;
import com.upm.dto.UserDto;
import com.upm.entities.*;
import com.upm.service.UserService;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UsersDao userDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserService userService;
	

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user = userDao.findByEmailId(email).orElseThrow(() ->new UsernameNotFoundException("Invalid Email !!!!!"));
		System.out.println(user);
		return new CustomUserDetails(user);
	}

}
