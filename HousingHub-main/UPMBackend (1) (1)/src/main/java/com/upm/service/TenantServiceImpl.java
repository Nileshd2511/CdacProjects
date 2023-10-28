package com.upm.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.upm.custom_exceptions.ResourceNotFoundException;
import com.upm.dao.TenantDao;
import com.upm.dao.UtilityDao;
import com.upm.dto.AddUtilityDto;
import com.upm.dto.ApiResponse;
import com.upm.entities.RentUtility;
import com.upm.entities.Tenant;
import com.upm.dao.UsersDao;
import com.upm.entities.RentUtility;
import com.upm.entities.Users;

@Transactional
@Service
public class TenantServiceImpl implements TenantService {

	@Autowired
	private TenantDao tenantDao;

	@Autowired
	private UtilityDao utilityDao;

	@Autowired
	private UsersDao userDao;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public ResponseEntity<?> updateRentStatus(boolean status, Long uid) {
		RentUtility rent = utilityDao.findByBillStatusAndId(status, uid).orElseThrow(()->new ResourceNotFoundException("Invalid Utility id!!!"));
		rent.setBillStatus(true);
		rent.setRentPaidDate(LocalDate.now());
		utilityDao.save(rent);
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Payment Successful...!!!!"));
	}

	@Override
	public List<AddUtilityDto> getUtilityListOfTenant(Long tid) {
		Users user = userDao.findById(tid).orElseThrow(()->new ResourceNotFoundException("Invalid Tenant id!!!"));
		Tenant tenant = user.getTenant();
		List<RentUtility> utilityList = tenant.getRentList();
		return utilityList.stream().map(i -> mapper.map(i, AddUtilityDto.class)).collect(Collectors.toList());
	}

	@Override
	public AddUtilityDto getUtilityByUtilityId(Long utilityId) {
		RentUtility utility = utilityDao.findById(utilityId).orElseThrow(()->new ResourceNotFoundException("Invalid Utility id!!!"));
		return mapper.map(utility, AddUtilityDto.class);
	}
}
