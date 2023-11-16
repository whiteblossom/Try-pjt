package org.example;

import java.io.Serializable;

public class User implements Serializable {
    int id;
    String username;
    String password;

    public User(int id,String username,String password){
        this.id=id;
        this.username=username;
        this.password=password;
    }
}
