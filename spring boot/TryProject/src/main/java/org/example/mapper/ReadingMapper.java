

package org.example.mapper;

import org.apache.ibatis.annotations.*;
import org.example.model.ArticleDTO;
import org.example.model.Recommendation;
import org.example.model.LogData;

import java.util.List;
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

    @Select("SELECT\n" +
            "*\n" +
            "FROM\n" +
            "    (\n" +
            "        WITH KeywordScores AS (\n" +
            "            SELECT\n" +
            "                ak.article_id,\n" +
            "                COALESCE(SUM(CASE WHEN rk.keyword_rank IS NOT NULL THEN 6 END), 0) AS keyword_score\n" +
            "            FROM\n" +
            "                articlekeyword ak\n" +
            "            LEFT JOIN (\n" +
            "                SELECT\n" +
            "                    keyword_id,\n" +
            "                    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS keyword_rank\n" +
            "                FROM\n" +
            "                    userkeyword\n" +
            "                WHERE\n" +
            "                    user_id = #{user_id}\n" +
            "                GROUP BY\n" +
            "                    keyword_id\n" +
            "                ORDER BY\n" +
            "                    count DESC\n" +
            "                LIMIT 10\n" +
            "            ) rk ON ak.keyword_id = rk.keyword_id\n" +
            "            WHERE\n" +
            "                ak.article_id != #{article_id}\n" +
            "            GROUP BY\n" +
            "                ak.article_id\n" +
            "        ),\n" +
            "        CategoryScores AS (\n" +
            "            SELECT\n" +
            "                a.article_id,\n" +
            "                CASE WHEN a.category_id = (SELECT category_id FROM article WHERE article_id = #{article_id}) THEN 30 ELSE 0 END AS category_score\n" +
            "            FROM\n" +
            "                article a\n" +
            "            WHERE\n" +
            "                a.article_id != #{article_id}\n" +
            "        ),\n" +
            "        ReporterScores AS (\n" +
            "            SELECT\n" +
            "                a.article_id,\n" +
            "                CASE WHEN a.reporter_name = '익명' THEN 0\n" +
            "                    WHEN a.reporter_name = (SELECT reporter_name FROM article WHERE article_id = #{article_id}) THEN 10\n" +
            "                    ELSE 0\n" +
            "                END AS reporter_score\n" +
            "            FROM\n" +
            "                article a\n" +
            "            WHERE\n" +
            "                a.article_id != 2\n" +
            "        )\n" +
            "        SELECT\n" +
            "            ks.article_id,\n" +
            "            (ks.keyword_score + cs.category_score + rs.reporter_score) AS total_score,\n" +
            "            a.recommended_score,\n" +
            "            a.title\n" +
            "        FROM\n" +
            "            KeywordScores ks\n" +
            "        JOIN\n" +
            "            CategoryScores cs ON ks.article_id = cs.article_id\n" +
            "        JOIN\n" +
            "            ReporterScores rs ON ks.article_id = rs.article_id\n" +
            "        JOIN\n" +
            "            article a ON ks.article_id = a.article_id\n" +
            "        ORDER BY\n" +
            "            total_score DESC\n" +
            "        LIMIT 30\n" +
            "    ) AS derived_table\n" +
            "ORDER BY\n" +
            "    derived_table.recommended_score / (SELECT SUM(recommended_score) FROM article) * 24 + RAND() DESC\n" +
            "LIMIT 15;\n")
    List<ArticleDTO> getRecommendation(@Param("user_id") String user_id,@Param("article_id") Integer article_id);


    @Select("SELECT gender, COUNT(*) as count " +
            "FROM news.logdata " +
            "JOIN news.user ON news.logdata.user_id = news.user.user_id " +
            "WHERE news.logdata.article_id = #{article_id} " +
            "GROUP BY gender")
    List<Map<String, Object>> getGenderData(@Param("article_id") int article_id);

    @Select("SELECT " +
            "  CASE " +
            "    WHEN age BETWEEN 10 AND 19 THEN '10대' " +
            "    WHEN age BETWEEN 20 AND 29 THEN '20대' " +
            "    WHEN age BETWEEN 30 AND 39 THEN '30대' " +
            "    WHEN age BETWEEN 40 AND 49 THEN '40대' " +
            "    WHEN age BETWEEN 50 AND 59 THEN '50대' " +
            "    WHEN age >= 60 THEN '60대 이상' " +
            "    ELSE '기타' " +
            "  END AS age_group, " +
            "  COUNT(news.logdata.user_id) AS count " +
            "FROM " +
            "  news.user " +
            "LEFT JOIN " +
            "  news.logdata ON news.logdata.user_id = news.user.user_id AND news.logdata.article_id = #{article_id} " +
            "GROUP BY age_group " +
            "ORDER BY age_group")
    List<Map<String, Object>> getAgeData(@Param("article_id") int articleId);

}


