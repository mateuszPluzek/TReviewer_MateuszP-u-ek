package com.example.treviewer.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class OperatorNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(OperatorNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String OperatornotFoundHandler(OperatorNotFoundException ex) {
        return ex.getMessage();
    }

}
