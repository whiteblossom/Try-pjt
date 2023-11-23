package org.example.controller;

import org.example.mapper.ReadingMapper;
import org.example.model.Article;
import org.example.model.Recommendation;
import org.example.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/reading")
public class ReadingController {

    private final ReadingMapper readingMapper;

    @Autowired
    public ReadingController(ReadingMapper readingMapper) {
        this.readingMapper = readingMapper;
    }

    @GetMapping("/recommend")
    public Integer findRecommendation(@RequestParam("article_id") Integer article_id, @RequestParam("user_id") String user_id) {
        Integer result = readingMapper.findRecommendation(article_id,user_id);
        // null이 반환되면 0으로 처리하거나 다른 기본값을 사용할 수 있습니다.
        return result;
    }

    @PutMapping("/recommend")
    public void handleLikeDislike(@RequestBody Recommendation recommendation) {
        readingMapper.handleLikeDislike(recommendation);
    }
    @GetMapping("/like")
    public Integer findlike(@RequestParam("article_id") Integer article_id, @RequestParam("user_id") String user_id) {
        Integer result = readingMapper.findRecommendation(article_id,user_id);
        // null이 반환되면 0으로 처리하거나 다른 기본값을 사용할 수 있습니다.
        return result;
    }
}
