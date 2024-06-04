package com.example.treviewer.exceptions;

public class RoutePostNotFoundException extends RuntimeException{
    public RoutePostNotFoundException(Integer id) {
        super("Could not find route post id " + id);
    }
}
