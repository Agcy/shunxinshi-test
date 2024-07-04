package com.haoshunxin.quizbackend.service.impl;

import com.haoshunxin.quizbackend.model.Question;
import com.haoshunxin.quizbackend.repository.QuestionRepository;
import com.haoshunxin.quizbackend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;
    @Override
    public List<Question> getAllQuestions() {
        System.out.println(questionRepository.findAll());
        return questionRepository.findAll();
    }
}
