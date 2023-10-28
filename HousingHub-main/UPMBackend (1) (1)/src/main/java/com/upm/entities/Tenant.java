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

@Entity
@Table(name = "tenant")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Tenant   {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private boolean status;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate leaveDate;
	
	private Double deposite;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private Users tenant;

	@OneToOne(cascade = CascadeType.ALL,mappedBy = "tenantFlat",orphanRemoval = true)
	@JsonIgnore
	private Flat flat;

	@OneToMany(mappedBy = "tenantUtility", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RentUtility> rentList = new ArrayList<>();
	

	public Tenant(Boolean status, LocalDate leaveDate, Double deposite) {
		super();
		this.status = status;
		this.leaveDate = leaveDate;
		this.deposite = deposite;
	}

	
}
