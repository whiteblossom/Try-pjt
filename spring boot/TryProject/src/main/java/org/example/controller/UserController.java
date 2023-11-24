
package org.example.controller;

import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.javassist.compiler.ast.Keyword;
import org.example.model.LogData;
import org.example.model.User;
import org.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
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
    @DeleteMapping("/delete/{user_id}")
    public void deleteUser(@PathVariable("user_id") String user_id) {
        userMapper.deleteUser(user_id);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        User foundUser = userMapper.findByUsernameAndPassword(user.getUser_id(), user.getPassword());
        if (foundUser != null) {
            return ResponseEntity.ok(foundUser);// 로그인 성공
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");// 로그인 실패
        }
    }
    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {
        @GetMapping("/user")
        public ResponseEntity<Object> checkLoginStatus(HttpSession session) {
            User user = (User) session.getAttribute("user_id");
            if (user != null) {
                return ResponseEntity.ok(user); // 로그인 상태
            } else {
                return ResponseEntity.ok("로그인되지 않음"); // 비로그인 상태
            }
        }
    }

    // 사용자 관심사 조회
    @GetMapping("/interests/{user_id}")
    public List<String> getUserInterests(@PathVariable String user_id) {
        return userMapper.getUserInterests(user_id);
    }

    @GetMapping("/recent-news/{user_id}")
    public List<String> getRecentlyViewedNews(@PathVariable String user_id) {
        return userMapper.getRecentlyViewedNews(user_id);
    }
}


