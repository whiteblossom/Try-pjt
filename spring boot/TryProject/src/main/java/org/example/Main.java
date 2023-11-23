package org.example;

import org.example.mapper.UserMapper;
import org.example.mapper.ArticleMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main implements CommandLineRunner{
    //CommandLineRunner 인터페이스의 run() 메소드를 구현하면
    //톰캣이 아닌 커맨드라인에서 실행할 수 있다. 간단한 테스트에 활용
    //톰캣도 구동됨

    private final UserMapper userMapper;
    private final ArticleMapper articleMapper;

    public Main(UserMapper userMapper,ArticleMapper articleMapper) {
        this.userMapper = userMapper;
        this.articleMapper = articleMapper;
    }
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        //System.out.println(this.articleMapper.findAll());

    }
}