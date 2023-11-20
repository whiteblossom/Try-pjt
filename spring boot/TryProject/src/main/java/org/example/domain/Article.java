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
    private String reporterName;
    private int views;
    private int likes;
    private int dislikes;
    private LocalDateTime write_Date;
    
}
