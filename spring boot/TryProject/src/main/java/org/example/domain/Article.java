package org.example.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private int articleId;
    private String title;
    private String content;
    private int categoryId;
    private String reporterName;
    private int views;
    private int likes;
    private int dislikes;
    private LocalDateTime writeDate;

    public Article(int articleId, String title, int views) {
        this.articleId = articleId;
        this.title = title;
        this.views = views;
    }
}
