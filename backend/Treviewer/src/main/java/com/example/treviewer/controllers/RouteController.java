package com.example.treviewer.controllers;

import com.example.treviewer.exceptions.RouteNotFoundException;
import com.example.treviewer.models.Route;
import com.example.treviewer.repositories.RouteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RouteController {

    private RouteRepository repository;

    public RouteController(RouteRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/routes")
    List<Route> all() {
        return repository.findAll();
    }
    //create
    @PostMapping("/routes")
    Route createRoute(@RequestBody Route newRoute) {
        return repository.save(newRoute);
    }
    //get
    @GetMapping("/routes/{id}")
    Route getRoute(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(()->new RouteNotFoundException(id));
    }
    //update
    @PutMapping("/routes/{id}")
    Route updateRoute(@RequestBody Route newRoute, @PathVariable Integer id) {
        return repository.findById(id).map(
                route-> {
                    route.setIdRoute(newRoute.getIdRoute());
                    route.setStation(newRoute.getStation());
                    route.setDestination(newRoute.getDestination());
                    route.setOperator(newRoute.getOperator());
                    route.setRouteName(newRoute.getRouteName());
                    route.setRouteType(newRoute.getRouteType());
                    return repository.save(route);
                }
        ).orElseGet(() -> {
            newRoute.setIdRoute(id);
            return repository.save(newRoute);
        });
    }
    //delete
    @DeleteMapping("/routes/{id}")
    void deleteRoute(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}
