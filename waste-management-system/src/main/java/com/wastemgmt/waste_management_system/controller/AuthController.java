package com.wastemgmt.waste_management_system.controller;

import com.wastemgmt.waste_management_system.service.AuthService;
import lombok.RequiredArgsConstructor;

import com.wastemgmt.waste_management_system.dto.LoginRequest;
import com.wastemgmt.waste_management_system.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController 
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            String message = authService.register(request);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
        String result = authService.login(request);
        return ResponseEntity.ok(result);
    } catch (Exception e) {
        return ResponseEntity.status(401).body(e.getMessage());
    }
}

@PostMapping("/logout")
public ResponseEntity<?> logout() {
    // Với cơ chế JWT Stateless, Server chỉ cần gửi phản hồi xác nhận.
    // Việc xóa Token thực tế sẽ do Frontend (React/Android/Postman) thực hiện.
    return ResponseEntity.ok("Đã đăng xuất thành công. Hãy xóa Token ở phía Client.");
}

}
