package org.example.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    private int article_id;
    private String title;
    private String content;
    private int category_id;
    private String reporter_Name;
    private int views;
    private int likes;
    private int dislikes;
    private LocalDateTime write_Date;

    private String category_name;

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }
}
