package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.example.model.Recommendation;

@Mapper
public interface ReadingMapper {
    @Select("SELECT recommendation FROM logdata WHERE article_id = #{article_id} AND user_id = #{user_id}")
    Integer findRecommendation(@Param("article_id") Integer article_id, @Param("user_id") String password);

    @Update("UPDATE logdata SET recommendation = #{recommendation.recommendation} WHERE user_id = #{recommendation.user_id} and article_id =#{recommendation.article_id}")
    void handleLikeDislike(@Param("recommendation") Recommendation recommendation);

}
