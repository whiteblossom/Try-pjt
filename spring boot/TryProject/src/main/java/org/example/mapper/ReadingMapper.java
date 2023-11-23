

package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.example.model.Recommendation;
import org.example.model.LogData;
import java.util.Map;

import java.time.LocalDateTime;

@Mapper
public interface ReadingMapper {
    @Select("SELECT recommendation FROM logdata WHERE article_id = #{article_id} AND user_id = #{user_id}")
    Integer findRecommendation(@Param("article_id") Integer article_id, @Param("user_id") String password);

    @Update("UPDATE logdata SET recommendation = #{recommendation.recommendation} WHERE user_id = #{recommendation.user_id} and article_id =#{recommendation.article_id}")
    void handleLikeDislike(@Param("recommendation") Recommendation recommendation);

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

    @Select("SELECT COUNT(*) FROM logdata WHERE recommendation = 1 AND article_id = #{article_id}")
    int getLike(@Param("article_id") int article_id);

    @Select("SELECT COUNT(*) FROM logdata WHERE recommendation = 2 AND article_id = #{article_id}")
    int getDisLike(@Param("article_id") int article_id);

    @Update("SET @decayRate = 0.95")
    void setDecayRate();

    @Update("UPDATE news.userkeyword SET count = GREATEST(ROUND(count * @decayRate, 3), 0.07) WHERE user_id = #{user_id}")
    void updateKeywordCount(@Param("user_id") String user_id);

    @Insert("INSERT INTO news.userkeyword (user_id, keyword_id, count) SELECT ld.user_id, ak.keyword_id, 1 FROM news.logdata ld JOIN news.articlekeyword ak ON ld.article_id = ak.article_id WHERE ld.user_id = #{user_id} AND ld.article_id = #{article_id} ON DUPLICATE KEY UPDATE count = count + 1")
    void updateKeyword(@Param("article_id") int article_id, @Param("user_id") String user_id);

}


