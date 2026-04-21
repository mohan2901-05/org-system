package com.example.org_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.org_backend.entity.DummyEntity;

public interface QaRepository extends JpaRepository<DummyEntity, String> {
    @Query(value = """
                SELECT
                    q.pk_question_id,
                    q.question_name,
                    a.answers,
                    a.correct_answer
                FROM question_info q
                JOIN answer_info a
                    ON q.pk_question_id = a.fk_question_id
                WHERE q.fk_chapter_id = :chapterId
                AND a.answer_status = 'A'
            """, nativeQuery = true)
    List<Object[]> getQuestionsByChapter(@Param("chapterId") String chapterId);
}