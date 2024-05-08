package com.example.treviewer.exceptions;

public class OperatorNotFoundException extends RuntimeException {
    public OperatorNotFoundException(Integer id) {
        super("Couldn't find operator id " + id);
    }
}
