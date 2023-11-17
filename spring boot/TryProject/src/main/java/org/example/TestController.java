package org.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TestController {

    @PostMapping("/api/users")
    public String user(){
        System.out.println("UserApiController 진입");

        User user = new User(1,"길동","1234");

        return "{aa:1}";
    }

}