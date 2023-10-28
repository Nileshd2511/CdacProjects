package com.upm.dto;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdateProfileDto {

	@NotBlank(message = "Name cannot be Empty!!")
	private String name;
	
	@Email(message = "Invalid Email Format")
	@NotBlank(message = "Email cannot be blanck!!")
	private String emailId;
	
	@NotBlank(message = "Contact info cannot be Empty!!")
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
}
