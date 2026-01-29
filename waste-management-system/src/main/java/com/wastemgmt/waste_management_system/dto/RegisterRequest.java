package com.wastemgmt.waste_management_system.dto;
import com.wastemgmt.waste_management_system.model.Role;
import lombok.Data;
@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private Role role;
}
