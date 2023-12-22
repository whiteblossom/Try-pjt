package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.model.Article;

import java.util.ArrayList;

@Mapper
public interface ArticleMapper {
    @Select("SELECT * FROM Article")
        // 모든 기사를 조회하는 쿼리
    ArrayList<Article> findAll();

    @Select("SELECT a.*, COUNT(l.article_id) as views " +
            "FROM news.article a " +
            "LEFT JOIN news.logdata l ON a.article_id = l.article_id " +
            "WHERE l.view_date >= NOW() - INTERVAL 24 HOUR " +
            "GROUP BY a.article_id " +
            "ORDER BY views DESC " +
            "LIMIT 10")
        // 최근 24시간 동안 조회수가 높은 상위 10개 기사를 조회하는 쿼리
    ArrayList<Article> headline();

    @Select("SELECT * FROM Article WHERE article_id = #{article_id}")
        // 특정 기사의 정보를 조회하는 쿼리
    ArrayList<Article> findArticle(@Param("article_id") int article_id);

    @Select("SELECT a.*, c.category as category_name FROM Article a " +
            "JOIN Category c ON a.category_id = c.category_id " +
            "WHERE a.category_id = #{category_id}")
        // 특정 카테고리에 속한 기사들을 조회하는 쿼리
    ArrayList<Article> findArticlesByCategory(@Param("category_id") int category_id);

    @Select("SELECT category FROM Category WHERE category_id = #{category_id}")
        // 카테고리 ID에 해당하는 카테고리 이름을 조회하는 쿼리
    String findCategoryNameById(@Param("category_id") int category_id);

    @Select("SELECT * FROM article WHERE title LIKE CONCAT('%', #{word}, '%')")
        // 특정 단어를 제목에 포함하는 기사를 조회하는 쿼리
    ArrayList<Article> searchArticle(@Param("word") String word);
}
