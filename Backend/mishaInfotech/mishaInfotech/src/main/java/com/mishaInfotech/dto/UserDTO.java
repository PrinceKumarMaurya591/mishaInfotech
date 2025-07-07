package com.mishaInfotech.dto;

import lombok.Data;

import jakarta.validation.constraints.*;


@Data
public class UserDTO {

    @NotBlank
    @Size(max = 25)
    private String name;

    @NotBlank
    private String gender;

    @Pattern(regexp = "^\\d{2}/\\d{2}/\\d{4}$", message = "DOB must be in dd/mm/yyyy format")
    private String dob;

    private String mobile;
    private String phone;

    @Email
    private String email;

    @NotBlank
    private String state;

    private String city;

    private String hobbies;

    private String photo;
}
