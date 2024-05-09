package com.example.treviewer.exceptions;

public class RouteNotFoundException extends RuntimeException {
    public RouteNotFoundException(Integer id) {
        super("Could not find route id " + id);
    }
}
