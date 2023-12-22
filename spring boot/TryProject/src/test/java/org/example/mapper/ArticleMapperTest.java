/*
package org.example.mapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class ArticleMapperTest {

    @Autowired
    private ArticleMapper articleMapper;

    @Test
    void testFindAll() {
        // 모든 기사를 조회하는 테스트
        int result = articleMapper.findAll().size();
        System.out.println(result);
        assertEquals(720, result);
    }

    @Test
    void findArticle() {
        // 특정 기사를 조회하는 테스트
        assertEquals(1, articleMapper.findArticle(1).size());
    }

    @Test
    void testFindArticlesByCategory() {
        // 특정 카테고리에 속한 기사를 조회하는 테스트
        int categoryId = 1;
        assertEquals(120, articleMapper.findArticlesByCategory(categoryId).size());
    }

    @Test
    void testFindCategoryNameById() {
        // 카테고리의 ID를 이용하여 카테고리 이름을 조회하는 테스트
        int categoryId = 1;
        assertEquals("culture", articleMapper.findCategoryNameById(categoryId));
    }

    @Test
    void testSearchArticle() {
        // 특정 단어를 포함하는 기사를 검색하는 테스트
        String searchWord = "ad";
        assertEquals(1, articleMapper.searchArticle(searchWord).size());
    }
}
*/