package com.haoshunxin.quizbackend.repository;

import com.haoshunxin.quizbackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
