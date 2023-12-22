package org.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Main implements CommandLineRunner{

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://211.62.99.57:8081", "http://211.62.99.57:8082")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }

        };
    }
    @Override
    public void run(String... args) throws Exception {
        //System.out.println(this.articleMapper.findAll());

    }
}