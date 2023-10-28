package com.upm.dto;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
public class FlatDto {

	@JsonProperty(access = Access.READ_ONLY)
	private Long flatId;
	
	@NotBlank(message = "Add floor Count!!")
	private Long floorNo;
	
	@NotBlank(message = "Add flat No!!")
	private Long flatNo;
	
	private boolean fullEmptyStatus;
	
	@NotBlank(message = "Add flat type!!")
	private String flatType;
	
	private boolean fullEmptyStatusOfTenant;
}
