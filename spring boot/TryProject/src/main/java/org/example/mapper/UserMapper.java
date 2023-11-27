package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.apache.ibatis.javassist.compiler.ast.Keyword;
import org.example.model.LogData;
import org.example.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {

    // 아이디로 사용자 정보 조회
    @Select("SELECT * FROM User where user_id = #{user_id}")
    User findById(@Param("user_id") String user_id);

    // 아이디와 비밀번호로 사용자 정보 조회
    @Select("SELECT * FROM User WHERE user_id = #{user_id} AND password = #{password}")
    User findByUsernameAndPassword(@Param("user_id") String user_id, @Param("password") String password);

    // 아이디 중복 확인
    @Select("SELECT user_id FROM User where user_id = #{user_id}")
    User confirmUser(@Param("user_id") String user_id);

    // 회원 가입
    @Insert("INSERT INTO User (user_id, password, age, gender) " +
            "VALUES (#{user.user_id}, #{user.password}, #{user.age}, #{user.gender})")
    void signupUser(@Param("user") User user);

    // 회원 탈퇴
    @Delete("DELETE FROM user WHERE user_id = #{user_id}")
    void deleteUser(@Param("user_id") String user_id);

    @Select("SELECT k.keyword FROM keyword k " +
            "JOIN userkeyword uk ON k.keyword_id = uk.keyword_id " +
            "WHERE uk.user_id = #{user_id} " +
            "ORDER BY uk.count DESC " +
            "LIMIT 10")
    List<String> getUserInterests(@Param("user_id") String user_id);

    @Select("SELECT a.title, a.article_id " +
            "FROM logdata l " +
            "JOIN article a ON l.article_id = a.article_id " +
            "WHERE l.user_id = #{user_id} " +
            "ORDER BY l.view_date DESC " +
            "LIMIT 10")
    List<Map<String, Object>> getRecentlyViewedNews(@Param("user_id") String user_id);


}
