package org.example.controller;

import org.example.mapper.ReadingMapper;
import org.example.model.LogData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/articles")
public class ReadingController {

    private final ReadingMapper readingMapper;

    @Autowired
    public ReadingController(ReadingMapper readingMapper) {
        this.readingMapper = readingMapper;
    }

    // 기사 읽으면 로그데이터 넣기
    @RequestMapping("/{article_id}/read")
    public String readArticle(@PathVariable int article_id, @RequestParam String user_id) {
        // 사용자가 기사를 읽었을 때 로그 데이터를 조회
        LogData logData = readingMapper.getLogData(user_id, article_id);

        if (logData == null) {
            // 로그 데이터가 없으면 새로운 로그 데이터를 삽입
            LogData newLogData = new LogData();
            newLogData.setUser_id(user_id);
            newLogData.setArticle_id(article_id);
            newLogData.setView_date(LocalDateTime.now());
            readingMapper.insertLogData(newLogData);
        } else {
            // 이미 로그 데이터가 있으면 viewdate를 업데이트
            readingMapper.updateLogDataViewdate(user_id, article_id, LocalDateTime.now());
        }

        return "Article Read!";
    }

    // 특정 기사의 조회수를 반환하는 API
    @RequestMapping("/{article_id}/views")
    public int getArticleViews(@PathVariable int article_id) {
        return readingMapper.getArticleViews(article_id);
    }
}
