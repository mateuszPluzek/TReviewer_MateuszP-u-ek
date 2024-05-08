package com.example.treviewer.exceptions;

public class StationNotFoundException extends RuntimeException {
    public StationNotFoundException(Integer id) {
        super("Could not find station id " + id);
    }
}
