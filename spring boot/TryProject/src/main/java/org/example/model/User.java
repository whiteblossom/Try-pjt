package org.example.model;

import lombok.*;
import org.apache.ibatis.javassist.compiler.ast.Keyword;

import java.util.List;

@NoArgsConstructor
@Data
public class User {

    private String user_id;
    private String password;
    private int age;
    private String gender;

    private List<String> interests;
    private List<String> recentNews;
}