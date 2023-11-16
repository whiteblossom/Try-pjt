package org.example.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Data
public class User {

    private String user_id;
    private String password;
    private int age;
    private String gender;

    public User(String user_id, String password){
        this.user_id = user_id;
        this.password = password;
    }

}