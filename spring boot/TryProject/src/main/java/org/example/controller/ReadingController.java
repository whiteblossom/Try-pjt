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
    /*로그데이터테이블에서 user_id와 article_id가 일치하는 로그를 찾아 해당 user가 추천,비추천,무응답 중 무엇을 눌렀는지 판별*/
    public Integer findRecommendation(@RequestParam("article_id") Integer article_id, @RequestParam("user_id") String user_id) {
        Integer result = readingMapper.findRecommendation(article_id,user_id);
        // null이 반환되면 0으로 처리하거나 다른 기본값을 사용할 수 있습니다.
        return result;
    }

    @PutMapping("/recommend")
    /*추천과 비추천,무응답 선택시에 따라 로그데이터가 변함*/
    public void handleLikeDislike(@RequestBody Recommendation recommendation) {
        readingMapper.handleLikeDislike(recommendation);
    }
    @GetMapping("/like/{article_id}")
    /*article_id가 일치하는 기사에서 like의 개수를 count하여 개수만 알려줌 */
    public Integer findlike(@PathVariable("article_id") Integer article_id) {
        Integer result = readingMapper.getLike(article_id);
        return result;
    }
    @GetMapping("/dislike/{article_id}")
    /*article_id가 일치하는 기사에서 dislike의 개수를 count하여 개수만 알려줌 */
    public Integer finddislike(@PathVariable("article_id") Integer article_id) {
        Integer result = readingMapper.getDisLike(article_id);
        return result;
    }
    @GetMapping("/recommendedscore/{article_id}")
    public void recommended_update(@PathVariable("article_id") Integer article_id) {
        readingMapper.r_update(article_id);
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

    @RequestMapping("/updatekeyword")
    public void updateKeyword(@RequestParam("article_id") Integer article_id, @RequestParam("user_id") String user_id) {
        readingMapper.setDecayRate();
        readingMapper.updateKeywordCount(user_id);
        readingMapper.updateKeyword(article_id,user_id);
    }

    @RequestMapping("/getRecommendation/{user_id}/{article_id}")
    public ArrayList<ArticleDTO> getRecommendation(@PathVariable String user_id, @PathVariable Integer article_id) {
        // getRecommendation이 ArrayList를 반환하는 것으로 가정
        ArrayList<ArticleDTO> articleDTOList = (ArrayList<ArticleDTO>) readingMapper.getRecommendation(user_id, article_id);

        return articleDTOList;
    }

    @GetMapping("/genderData")
    public List<Map<String, Object>> getGenderData(@RequestParam("article_id") int article_id) {
        return readingMapper.getGenderData(article_id);
    }

    @GetMapping("/ageData")
    public List<Map<String, Object>> getAgeData(@RequestParam("article_id") int article_id) {
        return readingMapper.getAgeData(article_id);
    }
}

