package com.upm.service;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.upm.custom_exceptions.ResourceNotFoundException;
import com.upm.dao.AdminDao;
import com.upm.dao.BuilderDao;
import com.upm.dao.BuildingDao;
import com.upm.dao.UsersDao;
import com.upm.dto.AddAdminDto;
import com.upm.entities.Admin;
import com.upm.entities.Builder;
import com.upm.entities.Building;
import com.upm.dao.FlatDao;
import com.upm.dao.UsersDao;
import com.upm.dto.AddAdminDto;
import com.upm.dto.AddBuildingDto;
import com.upm.dto.ApiResponse;
import com.upm.dto.LoginDto;
import com.upm.entities.Admin;
import com.upm.entities.Builder;
import com.upm.entities.Building;
import com.upm.entities.Flat;
import com.upm.entities.Users;

@org.springframework.transaction.annotation.Transactional
@Service
public class BuilderServiceImpl implements BuilderService {

	@Autowired
	private BuilderDao builderDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private BuildingDao buildingDao;
	@Autowired
	private UsersDao usersDao;
	@Autowired
	private FlatDao flatDao;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public ApiResponse addAdmin(AddAdminDto adminDto, Long builderId) {
		Users users = usersDao.findById(builderId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Builder Id"));
		Admin admin = new Admin();
		Users user = mapper.map(adminDto, Users.class);
		user.setPassword(encoder.encode(adminDto.getPassword()));
		Builder builder = builderDao.findByUserBuilder(users);
		user.setAdmin(admin);
		user.setAddedDate(LocalDate.now());
		builder.addAdmin(admin);
		admin.setAdmin(user);
		usersDao.save(user);
		return new ApiResponse("admin added successfully!!");
	}

	@Override
	public ApiResponse addBuilding(AddBuildingDto addbuildingDto, Long builderId) {
		Users user = usersDao.findById(builderId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Builder Id"));
		Builder builder = builderDao.findByUserBuilder(user);
		builder.addBuilding(mapper.map(addbuildingDto, Building.class));
		builderDao.save(builder);
		return new ApiResponse("building added successfully");
	}

	@Override
	public ApiResponse assignBuildingToAdmin(Long adminId, Long buildingId) {
		Users user = usersDao.findById(adminId).orElseThrow(() -> new ResourceNotFoundException("Invalid Builder Id"));
		Admin admin = adminDao.findByAdmin(user);
		admin.addBuilding(buildingDao.findById(buildingId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Building Id")));
		adminDao.save(admin);
		return new ApiResponse("building assigned to admin successfully");
	}

	@Override
	public ResponseEntity<?> removeBuilding(Long buildingId) {
		Building building = buildingDao.findById(buildingId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Building Id!!"));
		buildingDao.deleteById(buildingId);
		return ResponseEntity.status(HttpStatus.OK).body("building deleted successfully");
	}

	@Override
	public ResponseEntity<?> addFlat(Flat flat, Long buildingId) {
		Building building = buildingDao.findById(buildingId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Building Id!!"));
		building.addFlat(flat);
		flatDao.save(flat);
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Flat added successfully"));
	}

	@Override
	public List<AddBuildingDto> getBuildingList(Long builderId) {
		Users user = usersDao.findById(builderId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid builder Id!!"));
		Builder builder = builderDao.findByUserBuilder(user);
		List<Building> buildingList = buildingDao.findByBuildingBuilder(builder);
		List<AddBuildingDto> blist = buildingList.stream().map(building -> mapper.map(building, AddBuildingDto.class))
				.collect(Collectors.toList());
		for (AddBuildingDto addBuildingDto : blist) {
			if (addBuildingDto.getAdminsBuilding() == null)
				addBuildingDto.setStatus(false);
			else
				addBuildingDto.setStatus(true);
		}
		return blist;
	}

	@Override
	public List<AddAdminDto> getAdminList(Long builderId) {
		Users user = usersDao.findById(builderId).orElseThrow();
		Builder builder = builderDao.findByUserBuilder(user);
		List<Admin> adminList = adminDao.findByAdminBuilder(builder);
		for (Admin admin2 : adminList) {
			System.out.println(admin2.getAdmin().getName());
		}
		return adminList.stream().map(admin -> mapper.map(admin.getAdmin(), AddAdminDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public AddBuildingDto getBuildingDetails(Long buildingId) {
		return mapper.map(buildingDao.findById(buildingId).orElseThrow(), AddBuildingDto.class);
	}

}
