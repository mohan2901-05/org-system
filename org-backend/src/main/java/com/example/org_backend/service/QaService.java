package com.example.org_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.org_backend.dto.QuestionDTO;
import com.example.org_backend.repository.QaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class QaService {

    @Autowired
    private QaRepository repo;

    public List<QuestionDTO> getQuestionsByChapter(String chapterId) {

        List<Object[]> data = repo.getQuestionsByChapter(chapterId);

        List<QuestionDTO> result = new ArrayList<>();

        ObjectMapper mapper = new ObjectMapper();

        for (Object[] row : data) {
            try {
                QuestionDTO dto = new QuestionDTO();

                dto.setQuestionId((String) row[0]);
                dto.setQuestion((String) row[1]);

                // Convert JSON string → List
                List<String> options = mapper.readValue((String) row[2], List.class);
                dto.setOptions(options);

                dto.setCorrectAnswer((String) row[3]);

                result.add(dto);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return result;
    }
}