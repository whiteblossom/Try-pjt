package org.example.controller;

import org.example.model.Article;
import org.example.mapper.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleMapper articleMapper;

    @Autowired
    public ArticleController(ArticleMapper articleMapper) {
        this.articleMapper = articleMapper;
    }

    @GetMapping("/all")
    public ArrayList<Article> getAllArticles() {
        return articleMapper.findAll();
    }

    @GetMapping("/headline")
    public ArrayList<Article> getHeadlineArticles() {
        return articleMapper.headline();
    }

    @GetMapping("/detail/{article_id}")
    /* article_id(기사의 id)에 맞는 기사의 정보들을 가져옴 */
    public ArrayList<Article> getArticles(@PathVariable("article_id") int article_id) {
        return articleMapper.findArticle(article_id);
    }

    @GetMapping("/category/{category_id}")
    public ArrayList<Article> getArticlesByCategory(@PathVariable("category_id") int category_id) {
        ArrayList<Article> articles = articleMapper.findArticlesByCategory(category_id);
        String categoryName = articleMapper.findCategoryNameById(category_id);

        // 각 기사에 카테고리 이름 설정
        articles.forEach(article -> article.setCategory_name(categoryName));

        return articles;
    }
    @GetMapping("/search/{word}")
    public ArrayList<Article> searchArticles(@PathVariable("word") String word) {
        return articleMapper.searchArticle(word);
    }

}