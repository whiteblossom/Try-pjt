package org.example.controller;

import org.example.domain.Article;
import org.example.mappers.ArticleMapper;
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
    public ArrayList<Article> getArticleById() {
        return articleMapper.headline();
    }

    @GetMapping("/category/{category_id}")
    public ArrayList<Article> getArticlesByCategory(@PathVariable("category_id") int category_id) {
        return articleMapper.findArticlesByCategory(category_id);
    }
}
