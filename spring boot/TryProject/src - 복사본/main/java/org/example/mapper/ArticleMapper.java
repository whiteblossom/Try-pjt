package org.example.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.model.Article;

import java.util.ArrayList;

@Mapper
public interface ArticleMapper {
    @Select("SELECT * FROM Article")
    ArrayList<Article> findAll();

    @Select("SELECT a.*, COUNT(l.article_id) as views " +
            "FROM news.article a " +
            "LEFT JOIN news.logdata l ON a.article_id = l.article_id " +
            "WHERE l.view_date >= NOW() - INTERVAL 24 HOUR " +
            "GROUP BY a.article_id " +
            "ORDER BY views DESC " +
            "LIMIT 10")
    ArrayList<Article> headline();

    @Select("SELECT * FROM Article WHERE article_id = #{article_id}")
    ArrayList<Article> findArticle(@Param("article_id") int article_id);

    @Select("SELECT a.*, c.category as category_name FROM Article a " +
            "JOIN Category c ON a.category_id = c.category_id " +
            "WHERE a.category_id = #{category_id}")
    ArrayList<Article> findArticlesByCategory(@Param("category_id") int category_id);

    @Select("SELECT category FROM Category WHERE category_id = #{category_id}")
    String findCategoryNameById(@Param("category_id") int category_id);

    @Select("SELECT * FROM article WHERE title LIKE CONCAT('%', #{word}, '%')")
    ArrayList<Article> searchArticle(@Param("word") String word);

}
