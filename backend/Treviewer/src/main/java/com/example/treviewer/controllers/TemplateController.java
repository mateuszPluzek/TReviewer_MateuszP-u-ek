package com.example.treviewer.controllers;

import com.example.treviewer.models.Template;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class TemplateController {

    @GetMapping("/users")
    public List<Template> getAllTemplates() {
        List templates = new ArrayList<Template>();
        Template test = new Template();
        test.id = 1l;
        test.text = "Test";
        templates.add(test);
        return templates;
    }

}
