
package org.example.controller;

import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.annotations.Delete;
import org.example.domain.User;
import org.example.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping("/all")
    public ArrayList<User> getAllUsers() {
        return userMapper.findAll();
    }

    @GetMapping("/{user_id}")
    public User getUserById(@PathVariable String user_id) {
        return userMapper.findById(user_id);
    }
    @GetMapping("/confirm/{user_id}")
    public User confirmUser(@PathVariable("user_id") String user_id) {
        return userMapper.confirmUser(user_id);
    }
    @PostMapping("/signup")
    public String signupUser(@RequestBody User user) {
        userMapper.signupUser(user);
        return "{ \"message\" : \"회원가입되었습니다.\"}";
    }
    @DeleteMapping("/delete")
    public String DeleteUser(@PathVariable User user) {
        userMapper.deleteUser(user);
        return "탈퇴하였습니다";
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        User foundUser = userMapper.findByUsernameAndPassword(user.getUser_id(), user.getPassword());

        if (foundUser != null) {
            // 로그인 성공
            return ResponseEntity.ok(foundUser);
        } else {
            // 로그인 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    }
    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {

        @GetMapping("/user")
        public ResponseEntity<Object> checkLoginStatus(HttpSession session) {
            User user = (User) session.getAttribute("user_id");

            if (user != null) {
                // 로그인 상태
                return ResponseEntity.ok(user);
            } else {
                // 비로그인 상태
                return ResponseEntity.ok("로그인되지 않음");
            }
        }
    }
}


