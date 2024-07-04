package com.haoshunxin.quizbackend.model;

import jakarta.persistence.*;
import lombok.Data;

//import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;
    private String correctAnswer;
    private String answerAnalysis;

    @ElementCollection
    private List<String> options;

    public Question(String questionText, List<String> options, String correctAnswer, String answerAnalysis) {
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.answerAnalysis = answerAnalysis;
    }

    public Question() {

    }
}
