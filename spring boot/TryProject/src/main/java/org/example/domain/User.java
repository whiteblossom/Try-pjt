package org.example.domain;

import lombok.*;

@NoArgsConstructor
@Data
public class User {

    private String user_id;
    private String password;
    private int age;
    private String gender;

<<<<<<< Updated upstream
    public User() {
        // 기본 생성자 추가
    }

    public User(String user_id, String password){
        this.user_id = user_id;
        this.password = password;
    }
=======
>>>>>>> Stashed changes
}