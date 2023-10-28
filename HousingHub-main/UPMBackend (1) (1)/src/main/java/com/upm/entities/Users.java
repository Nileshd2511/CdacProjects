package com.upm.entities;

import java.time.LocalDate;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="users")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(allowGetters = true)
public class Users extends RoleBaseEntity{
	
	@Column(length= 40)
	private String name;
	
	@Column(name ="email_id", unique = true)
	private String emailId;
	
	@Column(length= 15,unique = true)
	private String contact;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(length = 255, nullable = false) 
	private String password;
	
	@Column(length= 200, name="permanent_address")
	private String permanentAddress;
	
	@Column(length= 200,name="image_path")
	private String imagePath;
	
	@Column(length= 20)
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToOne(cascade =CascadeType.ALL ,mappedBy = "admin" , orphanRemoval = true)
	@JsonIgnore
	private Admin admin;

	@OneToOne(cascade =CascadeType.ALL ,mappedBy = "owner" , orphanRemoval = true)
	@JsonIgnore
	private Owner owner;
	
	@OneToOne(cascade =CascadeType.ALL ,mappedBy = "tenant" , orphanRemoval = true)
	@JsonIgnore
	private Tenant tenant;
	
    @OneToOne(cascade = CascadeType.ALL,mappedBy = "userBuilder",orphanRemoval = true)
	@JsonIgnore
    private Builder builder;
	
//	@Override
//	public String toString() {
//		return "Users [name=" + name + ", emailId=" + emailId + ", contact=" + contact + ", password=" + password
//				+ ", permanentAddress=" + permanentAddress + ", imagePath=" + imagePath + ", role=" + role + "]";
//	}
}
