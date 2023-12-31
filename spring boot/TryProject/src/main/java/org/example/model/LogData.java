package org.example.model;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class LogData {

    private String user_id;
    private int article_id;
    private LocalDateTime view_date;
    private int recommendation;

}