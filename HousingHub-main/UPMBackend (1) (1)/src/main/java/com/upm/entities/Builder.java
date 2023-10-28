package com.upm.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "builder")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Builder {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name ="userBuilderId")
	@JsonIgnore
	private Users userBuilder; 

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long builderId;
//	
//	@Column(name = "first_name",length = 40)
//	private String firstName;
//	
//	@Column(name = "last_name",length = 40)
//	private String lastName; 
//	
//	@Column(unique = true)
//	private String email;
//	
//	@Column(length = 200)
//	private String address;
//	
//	@Column(name = "mob_no",length = 15,nullable = false)
//	private String mobNo;
//	
//	@Column(name = "password", nullable = false)
//	private String password;
	
	@OneToMany(mappedBy = "buildingBuilder",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
	List<Building> buildingList =new  ArrayList<Building>();
	
	@OneToMany(mappedBy = "adminBuilder",cascade = CascadeType.ALL,orphanRemoval = true)
	List<Admin> adminList =new ArrayList<>();
	
	public void addAdmin(Admin admin)
	{
		adminList.add(admin);
		admin.setadminBuilder(this);
	}
	public void removeAdmin(Admin admin)
	{
		adminList.remove(admin);
		admin.setadminBuilder(null);
	}
	
	public void addBuilding(Building building)
	{
		buildingList.add(building);
		building.setBuildingBuilder(this);
	}
	public void removeBuilding(Building building)
	{
		buildingList.remove(building);
		building.setBuildingBuilder(null);
	}
	

	
}