package org.example.controller;

import org.example.mapper.ReadingMapper;
import org.example.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reading")
public class ReadingController {

    private final ReadingMapper readingMapper;

    @Autowired
    public ReadingController(ReadingMapper readingMapper) {
        this.readingMapper = readingMapper;
    }

    @GetMapping("/recommend")
    // 사용자가 기사를 추천, 비추천, 무응답 중 어떤 행동을 했는지 확인하는 엔드포인트
    public Integer findRecommendation(@RequestParam("article_id") Integer article_id, @RequestParam("user_id") String user_id) {
        Integer result = readingMapper.findRecommendation(article_id, user_id);
        // null이 반환되면 0으로 처리하거나 다른 기본값을 사용할 수 있습니다.
        return result;
    }

    @PutMapping("/recommend")
    // 사용자가 추천, 비추천, 무응답을 선택했을 때 로그 데이터를 업데이트하는 엔드포인트
    public void handleLikeDislike(@RequestBody Recommendation recommendation) {
        readingMapper.handleLikeDislike(recommendation);
    }

    @GetMapping("/like/{article_id}")
    // 특정 기사의 좋아요 개수를 반환하는 엔드포인트
    public Integer findlike(@PathVariable("article_id") Integer article_id) {
        Integer result = readingMapper.getLike(article_id);
        return result;
    }

    @GetMapping("/dislike/{article_id}")
    // 특정 기사의 싫어요 개수를 반환하는 엔드포인트
    public Integer finddislike(@PathVariable("article_id") Integer article_id) {
        Integer result = readingMapper.getDisLike(article_id);
        return result;
    }

    @GetMapping("/recommendedscore/{article_id}")
    // 기사의 추천 점수를 업데이트하는 엔드포인트
    public void recommended_update(@PathVariable("article_id") Integer article_id) {
        readingMapper.r_update(article_id);
    }

    // 기사를 읽으면 로그 데이터를 넣는 엔드포인트
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

    // 특정 기사의 조회수를 반환하는 엔드포인트
    @RequestMapping("/{article_id}/views")
    public int getArticleViews(@PathVariable int article_id) {
        return readingMapper.getArticleViews(article_id);
    }

    @RequestMapping("/updatekeyword")
    // 사용자의 키워드를 업데이트하는 엔드포인트
    public void updateKeyword(@RequestParam("article_id") Integer article_id, @RequestParam("user_id") String user_id) {
        readingMapper.setDecayRate();
        readingMapper.updateKeywordCount(user_id);
        readingMapper.updateKeyword(article_id, user_id);
    }

    @RequestMapping("/getRecommendation/{user_id}/{article_id}")
    // 사용자에게 추천될 기사 목록을 가져오는 엔드포인트
    public ArrayList<ArticleDTO> getRecommendation(@PathVariable String user_id, @PathVariable Integer article_id) {
        // getRecommendation이 ArrayList를 반환하는 것으로 가정
        ArrayList<ArticleDTO> articleDTOList = (ArrayList<ArticleDTO>) readingMapper.getRecommendation(user_id, article_id);

        return articleDTOList;
    }

    @GetMapping("/genderData")
    // 특정 기사의 성별 데이터를 가져오는 엔드포인트
    public List<Map<String, Object>> getGenderData(@RequestParam("article_id") int article_id) {
        return readingMapper.getGenderData(article_id);
    }

    @GetMapping("/ageData")
    // 특정 기사의 연령 데이터를 가져오는 엔드포인트
    public List<Map<String, Object>> getAgeData(@RequestParam("article_id") int article_id) {
        return readingMapper.getAgeData(article_id);
    }
}
