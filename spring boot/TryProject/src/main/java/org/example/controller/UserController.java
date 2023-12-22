package org.example.controller;

import jakarta.servlet.http.HttpSession;
import org.example.model.ArticleDTO;
import org.example.model.User;
import org.example.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping("/{user_id}")
    // 사용자 아이디에 해당하는 사용자 정보를 조회하는 엔드포인트
    public User getUserById(@PathVariable String user_id) {
        return userMapper.findById(user_id);
    }

    @GetMapping("/confirm/{user_id}")
    // 사용자 아이디 중복 확인을 위한 엔드포인트
    public User confirmUser(@PathVariable("user_id") String user_id) {
        return userMapper.confirmUser(user_id);
    }

    @PostMapping("/signup")
    // 사용자 회원가입을 처리하는 엔드포인트
    public String signupUser(@RequestBody User user) {
        userMapper.signupUser(user);
        return "{ \"message\" : \"회원가입되었습니다.\"}";
    }

    @DeleteMapping("/delete/{user_id}")
    // 사용자 삭제를 처리하는 엔드포인트
    public void deleteUser(@PathVariable("user_id") String user_id) {
        userMapper.deleteUser(user_id);
    }

    @PostMapping("/login")
    // 사용자 로그인을 처리하는 엔드포인트
    public ResponseEntity<Object> login(@RequestBody User user) {
        User foundUser = userMapper.findByUsernameAndPassword(user.getUser_id(), user.getPassword());
        if (foundUser != null) {
            return ResponseEntity.ok(foundUser); // 로그인 성공
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");// 로그인 실패
        }
    }

    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {
        @GetMapping("/user")
        // 로그인 상태 확인을 위한 엔드포인트
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
    // 사용자가 최근에 본 뉴스 조회
    public List<Map<String, Object>> getRecentlyViewedNews(@PathVariable String user_id) {
        return userMapper.getRecentlyViewedNews(user_id);
    }

    @GetMapping("/userArticle/{keyword}")
    // 사용자가 관심 있는 키워드를 가진 기사 조회
    public List<ArticleDTO> getArticle(@PathVariable String keyword) {
        return userMapper.getArticle(keyword);
    }
}
