package org.example.mappers;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.domain.User;
import org.springframework.context.annotation.Import;

import java.util.ArrayList;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM User")
    ArrayList<User> findAll();

    @Select("SELECT * FROM User where user_id = #{user_id}")
    User findById(@Param("user_id") String user_id);

<<<<<<< Updated upstream
    @Select("SELECT * FROM User WHERE user_id = #{user_id} AND password = #{password}")
    User findByUsernameAndPassword(@Param("user_id") String user_id, @Param("password") String password);
}
=======
    @Select("SELECT user_id FROM User where user_id = #{user_id}")
    User confirmUser(@Param("user_id") String user_id);

    @Insert("INSERT INTO User (user_id, password, age, gender) " +
            "VALUES (#{user.user_id}, #{user.password}, #{user.age}, #{user.gender})")
    void signupUser(@Param("user") User user);
}
>>>>>>> Stashed changes
