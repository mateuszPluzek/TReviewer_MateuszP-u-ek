package com.example.treviewer.exceptions;

public class StationPostNotFoundException extends RuntimeException {
    public StationPostNotFoundException(Integer id) {
        super("Could not find station post id " + id);
    }
}
