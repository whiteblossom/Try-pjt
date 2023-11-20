package org.example.mappers;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.domain.Article;

import java.util.ArrayList;

@Mapper
public interface ArticleMapper {
    @Select("SELECT * FROM Article")
    ArrayList<Article> findAll();

    @Select("SELECT * FROM news.article ORDER BY views DESC LIMIT 10")
    ArrayList<Article>  headline();

    @Select("SELECT * FROM Article WHERE category_id = #{category_id}")
    ArrayList<Article> findArticlesByCategory(@Param("category_id") int category_id);
}
