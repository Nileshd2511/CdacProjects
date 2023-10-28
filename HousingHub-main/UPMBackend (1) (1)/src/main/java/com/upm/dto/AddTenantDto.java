package com.upm.dto;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.upm.entities.Flat;
import com.upm.entities.Role;
import com.upm.entities.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddTenantDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

	private LocalDate addedDate;

	@NotBlank(message = "Name canot be blanck!!")
	private String name;

	@NotBlank(message = "Email cannot be Empty!!")
	@Email(message = "Invalid email format!!")
	private String emailId;

	@NotBlank(message = "Contact cannot be empty!!")
	private String contact;

	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
			 message = "Invalid password format : "
					+ "Password should contain "
					+ "at least one lowercase letter, "
					+ "at least one uppercase letter, "
					+ "at least one digit, "
					+ "total length between 8 and 20 characters")
	private String password;

	@NotBlank(message = "Address cannot be empty!!")
	private String permanentAddress;

	private String imagePath;

	private Role role;

	private boolean status;

	private LocalDate leaveDate;

	private Double deposite;
	
	public boolean getStatus() {
		return status;
	}

}
