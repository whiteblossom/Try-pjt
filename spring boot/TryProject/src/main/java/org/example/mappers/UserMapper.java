package org.example.mappers;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.domain.User;

import java.util.ArrayList;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM User")
    ArrayList<User> findAll();

    @Select("SELECT * FROM User where user_id = #{user_id}")
    User findById(@Param("user_id") String user_id);
}
