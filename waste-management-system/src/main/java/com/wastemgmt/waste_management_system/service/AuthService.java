package com.wastemgmt.waste_management_system.service;

import com.wastemgmt.waste_management_system.dto.LoginRequest;
import com.wastemgmt.waste_management_system.dto.RegisterRequest;
import com.wastemgmt.waste_management_system.model.UserAccount;
import com.wastemgmt.waste_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã được sử dụng!");
        }

        UserAccount user = new UserAccount();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        // Mã hóa mật khẩu trước khi lưu
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return "Người dùng " + request.getFullName() + " đã đăng ký thành công với quyền " + request.getRole();
    }
    public String login(LoginRequest request) {
    UserAccount user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Email không tồn tại!"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Mật khẩu không chính xác!");
    }

    // Thay vì trả về String thông thường, hãy trả về Token
    return jwtService.generateToken(user.getEmail(), user.getRole().name());
}

}
