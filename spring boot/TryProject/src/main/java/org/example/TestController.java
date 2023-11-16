package org.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @PostMapping("/api/users")
    public User user(){
        System.out.println("UserApiController 진입");

        User user = new User(1,"길동","1234");

        return user;
    }
}