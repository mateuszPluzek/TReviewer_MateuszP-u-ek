package com.example.treviewer.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


//@RestController
//public class MainController {
//    @RequestMapping(value = {"/", "/login"})
//    public String login(HttpServletRequest request){
//        String val = request.getParameter("test");
//        if(val != null) {
//            return "test";
//        }
//
//        return "login";
//    }
//}

@Controller
public class MainController {
    @GetMapping("/")
    public String login() {
        return "index";
    }

}