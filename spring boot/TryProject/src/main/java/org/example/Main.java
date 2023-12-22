package org.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Main implements CommandLineRunner {

    public static void main(String[] args) {
        // 스프링 부트 애플리케이션을 실행하는 메인 메소드
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        // CORS(Cross-Origin Resource Sharing) 설정을 위한 빈을 생성하는 메소드
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // CORS 허용 정책을 설정하는 메소드
                registry.addMapping("/**")
                        .allowedOrigins("http://211.62.99.57:8081", "http://211.62.99.57:8082")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
