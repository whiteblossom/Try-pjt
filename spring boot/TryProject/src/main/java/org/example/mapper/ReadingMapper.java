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
        // 특정 기사에 대한 사용자의 추천 여부를 조회하는 쿼리
    Integer findRecommendation(@Param("article_id") Integer article_id, @Param("user_id") String password);

    @Update("UPDATE logdata SET recommendation = #{recommendation.recommendation} WHERE user_id = #{recommendation.user_id} and article_id =#{recommendation.article_id}")
        // 사용자의 추천, 비추천, 무응답에 따라 로그 데이터를 업데이트하는 쿼리
    void handleLikeDislike(@Param("recommendation") Recommendation recommendation);

    @Select("SELECT * FROM logdata WHERE user_id = #{user_id} AND article_id = #{article_id}")
        // 사용자의 특정 기사에 대한 로그 데이터를 조회하는 쿼리
    LogData getLogData(@Param("user_id") String user_id, @Param("article_id") int article_id);

    @Insert("INSERT INTO logdata (user_id, article_id, view_date) VALUES (#{user_id}, #{article_id}, #{view_date})")
        // 사용자가 기사를 읽었을 때 로그 데이터를 삽입하는 쿼리
    void insertLogData(LogData logData);

    @Update("UPDATE logdata SET view_date = #{view_date} WHERE user_id = #{user_id} AND article_id = #{article_id}")
        // 사용자가 기사를 읽었을 때 로그 데이터의 조회 날짜를 업데이트하는 쿼리
    void updateLogDataViewdate(@Param("user_id") String user_id, @Param("article_id") int article_id, @Param("view_date") LocalDateTime view_date);

    @Select("SELECT COUNT(*) FROM logdata WHERE article_id = #{article_id}")
        // 특정 기사의 조회수를 조회하는 쿼리
    int getArticleViews(@Param("article_id") int article_id);

    @Select("SELECT COUNT(*) FROM logdata WHERE recommendation = 1 AND article_id = #{article_id}")
        // 특정 기사에 대한 추천 수를 조회하는 쿼리
    int getLike(@Param("article_id") int article_id);

    @Select("SELECT COUNT(*) FROM logdata WHERE recommendation = 2 AND article_id = #{article_id}")
        // 특정 기사에 대한 비추천 수를 조회하는 쿼리
    int getDisLike(@Param("article_id") int article_id);

    @Update("SET @decayRate = 0.95")
        // 로그 데이터의 키워드 가중치 감소율을 설정하는 쿼리
    void setDecayRate();

    @Update("UPDATE news.userkeyword SET count = GREATEST(ROUND(count * @decayRate, 3), 0.07) WHERE user_id = #{user_id}")
        // 사용자의 키워드 가중치를 업데이트하는 쿼리
    void updateKeywordCount(@Param("user_id") String user_id);

    @Update("UPDATE article a\n" +
            "LEFT JOIN (\n" +
            "  -- 첫 번째 쿼리\n" +
            "  SELECT \n" +
            "    a.article_id,\n" +
            "    ROUND(LOG10(COALESCE(ld.log_count, 0) + 2), 2) AS recommended_score\n" +
            "  FROM \n" +
            "    article a\n" +
            "  LEFT JOIN (\n" +
            "    SELECT article_id, COUNT(*) AS log_count\n" +
            "    FROM news.logdata\n" +
            "    GROUP BY article_id\n" +
            "  ) ld ON a.article_id = ld.article_id\n" +
            ") AS result1 ON a.article_id = result1.article_id\n" +
            "LEFT JOIN (\n" +
            "  -- 두 번째 쿼리\n" +
            "  SELECT \n" +
            "    a.article_id, \n" +
            "    COUNT(*) + 1 AS total_log_count, \n" +
            "    COUNT(CASE WHEN l.recommendation = 1 THEN 1 END) + 1 AS recommendation_1_count,\n" +
            "    CAST((COUNT(CASE WHEN l.recommendation = 1 THEN 1 END) + 1) / (COUNT(*) + 1) AS DECIMAL(10, 2)) AS recommendation_1_ratio\n" +
            "  FROM \n" +
            "    news.logdata l\n" +
            "  JOIN (\n" +
            "    SELECT article_id, COUNT(*) AS log_count\n" +
            "    FROM news.logdata\n" +
            "    GROUP BY article_id\n" +
            "  ) a ON l.article_id = a.article_id\n" +
            "  GROUP BY\n" +
            "    a.article_id\n" +
            ") AS result2 ON a.article_id = result2.article_id\n" +
            "SET a.recommended_score = ROUND(result1.recommended_score * result2.recommendation_1_ratio, 2)\n" +
            "WHERE a.article_id = #{article_id};")
        // 기사의 추천 점수를 업데이트하는 쿼리
    void r_update(@Param("article_id") Integer article_id);

    @Insert("INSERT INTO news.userkeyword (user_id, keyword_id, count) SELECT ld.user_id, ak.keyword_id, 1 FROM news.logdata ld JOIN news.articlekeyword ak ON ld.article_id = ak.article_id WHERE ld.user_id = #{user_id} AND ld.article_id = #{article_id} ON DUPLICATE KEY UPDATE count = count + 1")
        // 사용자의 키워드를 업데이트하는 쿼리
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
            "                a.article_id != #{article_id}\n" +
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
        // 사용자에게 추천할 기사를 조회하는 쿼리
    List<ArticleDTO> getRecommendation(@Param("user_id") String user_id, @Param("article_id") Integer article_id);

    @Select("SELECT gender, COUNT(*) as count " +
            "FROM news.logdata " +
            "JOIN news.user ON news.logdata.user_id = news.user.user_id " +
            "WHERE news.logdata.article_id = #{article_id} " +
            "GROUP BY gender")
        // 특정 기사를 읽은 사용자의 성별 분포를 조회하는 쿼리
    List<Map<String, Object>> getGenderData(@Param("article_id") int article_id);

    @Select("SELECT " +
            "  CASE " +
            "    WHEN age BETWEEN 0 AND 19 THEN '10대' " +
            "    WHEN age BETWEEN 20 AND 29 THEN '20대' " +
            "    WHEN age BETWEEN 30 AND 39 THEN '30대' " +
            "    WHEN age BETWEEN 40 AND 49 THEN '40대' " +
            "    WHEN age BETWEEN 50 AND 59 THEN '50대' " +
            "    ELSE '60대 이상' " +
            "  END AS age_group, " +
            "  COUNT(news.logdata.user_id) AS count " +
            "FROM " +
            "  news.user " +
            "LEFT JOIN " +
            "  news.logdata ON news.logdata.user_id = news.user.user_id AND news.logdata.article_id = #{article_id} " +
            "GROUP BY age_group " +
            "ORDER BY age_group")
        // 특정 기사를 읽은 사용자의 연령대 분포를 조회하는 쿼리
    List<Map<String, Object>> getAgeData(@Param("article_id") int articleId);
}
