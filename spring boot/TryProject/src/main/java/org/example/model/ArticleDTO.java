package org.example.model;

import lombok.Data;

@Data
public class ArticleDTO {

        private Long article_id;
        private String title;
        private Long category_id;
        private String reporter_name;
}
