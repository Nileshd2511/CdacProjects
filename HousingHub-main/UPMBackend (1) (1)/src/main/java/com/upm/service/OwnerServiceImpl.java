package com.upm.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.upm.custom_exceptions.ResourceNotFoundException;
import com.upm.dao.FlatDao;
import com.upm.dao.OwnerDao;
import com.upm.dao.TenantDao;
import com.upm.dao.UsersDao;
import com.upm.dto.AddTenantDto;
import com.upm.entities.Flat;
import com.upm.entities.Owner;
import com.upm.entities.Tenant;
import com.upm.entities.Users;
import com.upm.dto.AddUtilityDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.FlatDto;
import com.upm.entities.Flat;
import com.upm.entities.Tenant;
import com.upm.entities.Users;
import com.upm.entities.RentUtility;

@Transactional
@Service
public class OwnerServiceImpl implements OwnerService {

	@Autowired
	private OwnerDao ownerDao;

	@Autowired
	private TenantDao tenantDao;

	@Autowired
	private UsersDao userDao;

	@Autowired
	private FlatDao flatDao;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public AddTenantDto addTenant(AddTenantDto tenantDto) {
		Users user = mapper.map(tenantDto, Users.class);
		user.setAddedDate(LocalDate.now());
		user.setPassword(encoder.encode(tenantDto.getPassword()));
		Tenant tenant = new Tenant(tenantDto.getStatus(), tenantDto.getLeaveDate(), tenantDto.getDeposite());
		user.setTenant(tenant);
		tenant.setTenant(user);
		Tenant newTenant = tenantDao.findByTenant(userDao.save(user));
		return mapper.map(newTenant, AddTenantDto.class);
	}

	@Override
	public ResponseEntity<?> assignFlatToTenant(Long id, Long tId) {
		Flat flat = flatDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid flat Id"));
		System.out.println("flat : " + flat.toString());
		Tenant tenant = tenantDao.findById(tId).orElseThrow(()->new ResourceNotFoundException("Invalid tenant Id"));
		System.out.println("tenant : " + tenant.toString());
		flat.setFullEmptyStatusOfTenant(true);
		flat.setTenantFlat(tenant);
		tenant.setFlat(flat);
		flatDao.save(flat);
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Tenant Added To Tenant"));
	}

	@Override
	public ApiResponse assignUtilityToTenant(Long fId, Long tId, AddUtilityDto addUtilityDto) {
		Flat flat = flatDao.findById(fId).orElseThrow();
//		Users user = userDao.findById(tId).orElseThrow(()-> new ResourceNotFoundException("Invalid Tenant"));
		Tenant tenant = tenantDao.findById(tId).orElseThrow();
		addUtilityDto.setBillStatus(false);
		addUtilityDto.setRentPaidDate(null);
		RentUtility utility = mapper.map(addUtilityDto, RentUtility.class);
		System.out.println("utility : " + utility.toString());
		flat.addUtility(utility);
		utility.setTenantUtility(tenant);
		return new ApiResponse("Utility Assigned To Tenant Successfully !!! ");
	}

	@Override
	public AddTenantDto getTenantInfo(Long flatId) {
		// TODO Auto-generated method stub
		Flat flat = flatDao.findById(flatId).orElseThrow();

		Tenant tenant = flat.getTenantFlat();
		Users user = tenant.getTenant();
		AddTenantDto tenantDto;
		if (user != null) {
			tenantDto = mapper.map(user, AddTenantDto.class);
			tenantDto.setId(tenant.getId());
			tenantDto.setLeaveDate(tenant.getLeaveDate());
			tenantDto.setStatus(tenant.isStatus());
			tenantDto.setDeposite(tenant.getDeposite());

	 
		 
			return tenantDto;
		} else
			return null;
	}

	@Override
	public FlatDto getFlatInfo(Long flatId) {
		// TODO Auto-generated method stub
		return mapper.map(flatDao.findById(flatId), FlatDto.class);
	}

	@Override
	public List<AddTenantDto> getTenantInfoByOwnerId(Long ownerId) {
		// TODO Auto-generated method stub
		Users user = userDao.findById(ownerId).orElseThrow();
		Owner owner = ownerDao.findByOwner(user).orElseThrow();
		List<Flat> tenantFlatList = flatDao.findByOwner(owner);
		List<AddTenantDto> tenantList = new ArrayList<>();
		for (Flat flat : tenantFlatList) {
			AddTenantDto tenant = getTenantInfo(flat.getFlatId());
			if (tenant != null)
				tenantList.add(tenant);
		}
		return tenantList;
	}

	@Override
	public List<AddUtilityDto> getUtilityListOfFlat(Long flatId) {
		Flat flat = flatDao.findById(flatId).orElseThrow();
		List<RentUtility> rentUtilityList = flat.getUtilityList();
		rentUtilityList.forEach(i->System.out.println("rent : "+i.getElectricityBill()));
		List<AddUtilityDto> rentList = rentUtilityList.stream().map(i -> mapper.map(i, AddUtilityDto.class))
				.collect(Collectors.toList());
		rentList.forEach(i->System.out.println(i.getWaterBill()));
		return rentList;
	}
}
