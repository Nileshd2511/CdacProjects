package com.upm.dto;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.upm.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddAdminDto {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private LocalDate addedDate;
	
	@NotBlank(message = "First name cannot be empty")
	private String name;
	
	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Invalid format for email")
	private String emailId;
	
	private String contact;
	
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
			 message = "Invalid password format : "
					+ "Password should contain "
					+ "at least one lowercase letter, "
					+ "at least one uppercase letter, "
					+ "at least one digit, "
					+ "total length between 8 and 20 characters")
	private String password;
	
	private String permanentAddress;
	
	private String imagePath;
	
	private Role role;
	
	private Long builderId;
	
	private Long buildingId;
}
