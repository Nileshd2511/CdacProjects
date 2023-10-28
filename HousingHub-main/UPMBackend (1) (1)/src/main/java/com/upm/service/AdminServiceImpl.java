package com.upm.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.upm.custom_exceptions.ResourceNotFoundException;
import com.upm.dao.AdminDao;
import com.upm.dao.BuildingDao;
import com.upm.dao.FlatDao;
import com.upm.dao.OwnerDao;
import com.upm.dao.TenantDao;
import com.upm.dao.UsersDao;
import com.upm.dto.AddAdminDto;
import com.upm.dto.AddBuildingDto;
import com.upm.dto.AddOwnerDto;
import com.upm.dto.AddTenantDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.FlatDto;
import com.upm.entities.Admin;
import com.upm.entities.Building;
import com.upm.entities.Flat;
import com.upm.entities.Owner;
import com.upm.entities.Tenant;
import com.upm.entities.Users;

@Transactional
@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private OwnerDao ownerDao;

	@Autowired
	private UsersDao userDao;

	@Autowired
	private FlatDao flatDao;

	@Autowired
	private AdminDao adminDao;

	@Autowired
	private BuildingDao buildingDao;

	@Autowired
	private TenantDao tenantDao;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private PasswordEncoder encoder;

	public AdminServiceImpl() {
		System.out.println("inside ctor : " + getClass());
	}

	@Override
	public AddOwnerDto addOwner(AddOwnerDto ownerDto) {
		Users user = mapper.map(ownerDto, Users.class);
		Owner owner = new Owner();
		user.setPassword(encoder.encode(ownerDto.getPassword()));
		user.setAddedDate(LocalDate.now());
		owner.setOwner(user);
		user.setOwner(owner);
		Users newUser=userDao.save(user);
		Owner newOwner=ownerDao.findByOwner(newUser).orElseThrow(()->new ResourceNotFoundException("Invalid User!!"));
		return mapper.map(newOwner, AddOwnerDto.class); 
	}

	public ApiResponse addFaltToOwner(Long id, Long oId) {
		Flat flat = flatDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid Flat Id!!"));
		Owner owner = ownerDao.findById(oId).orElseThrow(()->new ResourceNotFoundException("Invalid Owner Id!!"));
		owner.addFlat(flat);
		flat.setFullEmptyStatus(true);
		flatDao.save(flat);
		return new ApiResponse("flat added to owner successfully");
	}

	@Override
	public List<AddBuildingDto> getBuildingList(Long adminId) {
		Users user = userDao.findById(adminId).orElseThrow(()-> new ResourceNotFoundException("Invalid Admin Id"));

		List<Building> buildingList = buildingDao.findByAdminsBuilding(user.getAdmin());

		return buildingList.stream().map(building -> mapper.map(building, AddBuildingDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<FlatDto> getFlatList(Long buildingId) {
		Building building = buildingDao.findById(buildingId).orElseThrow(()->new ResourceNotFoundException("Invalid Building Id!!"));

		List<Flat> flatList = flatDao.findByBuilding(building);

		return flatList.stream().map(f -> mapper.map(f, FlatDto.class)).collect(Collectors.toList());
	}

	@Override
	public AddOwnerDto getOwner(Long flatId) {
		Flat flat = flatDao.findById(flatId).orElseThrow(()->new ResourceNotFoundException("Invalid flat Id!!!"));
		Owner owner = flat.getOwner();
		if(owner==null)
		{
			 throw new ResourceNotFoundException("Owner not found!!");
		}
		Users user = owner.getOwner();
		
		return mapper.map(user, AddOwnerDto.class);
	}

	@Override
	public AddTenantDto getTenant(Long flatId) {
		Flat flat = flatDao.findById(flatId).orElseThrow(()->new ResourceNotFoundException("invalid Flat Id!!"));
		Tenant tenant = flat.getTenantFlat();
		Users user = tenant.getTenant();
		if(user==null)
			throw new ResourceNotFoundException("Tenant not found!!");
		return mapper.map(user, AddTenantDto.class);
	}

	@Override
	public List<AddOwnerDto> getAllOwnerList(Long adminId) {
		List<AddBuildingDto> buildingList = getBuildingList(adminId);
		List<FlatDto> flatList = new ArrayList<FlatDto>();

		for (AddBuildingDto buildingDto : buildingList) {
			flatList.addAll(getFlatList(buildingDto.getId()));
		}
		List<AddOwnerDto> ownerList = new ArrayList<AddOwnerDto>();
		for (FlatDto flatDto : flatList) {
			AddOwnerDto owner=getOwner(flatDto.getFlatId());
			if(owner!=null)
			ownerList.add(owner);
		
		}
		return ownerList;
	
	}

	@Override
	public List<FlatDto> getAllEmptyFlats(Long buildingId) {
		Building building=buildingDao.findById(buildingId).orElseThrow(()->new ResourceNotFoundException("Invalid building id!!"));
		List<Flat> flatList=flatDao.findByBuilding(building);
		return flatList.stream()
					.filter(i-> i.getOwner()==null)
					.map(flat -> mapper.map(flat, FlatDto.class))
					.collect(Collectors.toList());
	}

	@Override
	public List<FlatDto> getFlatListByOwner(Long ownerId) {
		Users user = userDao.findById(ownerId).orElseThrow(()->new ResourceNotFoundException("Invalid Owner"));
		List<Flat> flatList=flatDao.findByOwner(ownerDao.findById(user.getOwner().getId()).orElseThrow(()->new ResourceNotFoundException("Invalid Owner Id!!")));
		return flatList.stream()
				.map(flat ->mapper.map(flat, FlatDto.class))
				.collect(Collectors.toList());
	}

}
