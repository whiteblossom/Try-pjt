package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.example.model.LogData;

import java.time.LocalDateTime;

@Mapper
public interface ReadingMapper {

    @Select("SELECT * FROM logdata WHERE user_id = #{user_id} AND article_id = #{article_id}")
    LogData getLogData(@Param("user_id") String user_id, @Param("article_id") int article_id);

    //로그데이터 넣기
    @Insert("INSERT INTO logdata (user_id, article_id, view_date) VALUES (#{user_id}, #{article_id}, #{view_date})")
    void insertLogData(LogData logData);

    //시간 업데이트
    @Update("UPDATE logdata SET view_date = #{view_date} WHERE user_id = #{user_id} AND article_id = #{article_id}")
    void updateLogDataViewdate(@Param("user_id") String user_id, @Param("article_id") int article_id, @Param("view_date") LocalDateTime view_date);

    //조회수 계산
    @Select("SELECT COUNT(*) FROM logdata WHERE article_id = #{article_id}")
    int getArticleViews(@Param("article_id") int article_id);
}
