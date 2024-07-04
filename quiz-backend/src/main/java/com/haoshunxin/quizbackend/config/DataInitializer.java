package com.haoshunxin.quizbackend.config;

import com.haoshunxin.quizbackend.model.Question;
import com.haoshunxin.quizbackend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataInitializer {
    @Autowired
    private QuestionRepository questionRepository;

    @Bean
    public CommandLineRunner loadData() {
        return (args) -> {
            questionRepository.save(new Question(
                    "选择题题干",
                    Arrays.asList("选项", "选项B", "选项C", "选项D"),
                    "B",
                    "(答案解析)"
            ));
        };
    }
}
