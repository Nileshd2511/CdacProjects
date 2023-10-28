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
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.asm.Advice.Local;

@Entity
@Table(name = "admin")
@NoArgsConstructor
@AllArgsConstructor
public class Admin{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="user_admin_id")
	@JsonIgnore
	private Users admin;
	
	@ManyToOne
	@JoinColumn(name="builder_admin_id")
	@JsonIgnore
	private Builder adminBuilder;
	
	@OneToMany(mappedBy = "adminsBuilding",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Building> buildingList = new ArrayList<Building>();

			
	public Users getAdmin() {
		return admin;
	}

	public void setAdmin(Users admin) {
		this.admin = admin;
	}

	public Builder getadminBuilder() {
		return adminBuilder;
	}

	public void setadminBuilder(Builder builder) {
		this.adminBuilder = builder;
	}
	
	public void addBuilding(Building building)
	{
		buildingList.add(building);
		building.setAdminsBuilding(this);
	}
	public void removeBuilding(Building building)
	{
		buildingList.remove(building);
		building.setAdminsBuilding(null);
	}

//	@Override
//	public String toString() {
//		return "Admin [admin=" + admin + ", builder=" + adminBuilder + "]";
//	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	
	
}
