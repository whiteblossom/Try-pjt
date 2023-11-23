package org.example.controller;

import org.example.mapper.ReadingMapper;
<<<<<<< Updated upstream
import org.springframework.beans.factory.annotation.Autowired;
=======
import org.example.model.Recommendation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.model.LogData;
import org.springframework.web.bind.annotation.PathVariable;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
public class ReadingController {

    private final ReadingMapper readingMapper;

    @Autowired
    public ReadingController(ReadingMapper readingMapper) {
        this.readingMapper = readingMapper;
    }

}
