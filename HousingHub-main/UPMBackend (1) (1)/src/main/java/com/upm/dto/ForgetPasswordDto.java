package com.upm.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ForgetPasswordDto {

	@NotBlank(message = "Email cannot be Empty!!")
	@Email(message = "Invalid email format!!")
	private String emailId;
	
	@NotBlank(message = "Password cannot be empty")
	private String oldPassword;
	
	@NotBlank(message = "Password cannot be empty")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,20}$",
	 message = "Invalid password format : "
			+ "Password should contain "
			+ "at least one lowercase letter, "
			+ "at least one uppercase letter, "
			+ "at least one digit, "
			+ "total length between 8 and 20 characters")
	private String newPassword;
}
