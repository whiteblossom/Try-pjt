package org.example.model;

import lombok.*;


@NoArgsConstructor
@Data
public class Recommendation {

    private String user_id;
    private int article_id;
    private int recommendation;
    private int reporter_name;
}