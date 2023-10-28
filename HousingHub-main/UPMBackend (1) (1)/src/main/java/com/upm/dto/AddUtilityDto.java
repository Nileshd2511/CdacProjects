package com.upm.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddUtilityDto {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

	private double gasBill;

	private double waterBill;

	private double electricityBill;

	private boolean billStatus;

	private double rentAmount;

	private LocalDate addedDate;

	private LocalDate rentPaidDate;
}
