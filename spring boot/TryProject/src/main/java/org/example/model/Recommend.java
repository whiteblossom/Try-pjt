package org.example.model;

import lombok.*;

@NoArgsConstructor
@Data
public class Recommend {

    private String user_id;
    private int atricle_id;
    private int Recommendation;
}