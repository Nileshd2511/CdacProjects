package com.upm.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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
public class LoginDto {

	@NotBlank(message = "Email cannot be Empty!!")
	@Email(message = "Invalid email format!!")
	private String emailId;
	
	@NotBlank(message = "Password Cannot Empty!!")
	private String password;
}
