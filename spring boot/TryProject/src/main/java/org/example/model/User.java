package org.example.model;

import lombok.*;

@NoArgsConstructor
@Data
public class User {

    private String user_id;
    private String password;
    private int age;
    private String gender;
}