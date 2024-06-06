package com.example.treviewer.controllers;

import com.example.treviewer.exceptions.RoutePostNotFoundException;
import com.example.treviewer.exceptions.StationPostNotFoundException;
import com.example.treviewer.models.RoutePost;
import com.example.treviewer.models.StationPost;
import com.example.treviewer.repositories.RoutePostRepository;
import com.example.treviewer.repositories.StationPostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class RoutePostController {

    private RoutePostRepository repository;

    public RoutePostController(RoutePostRepository repository){this.repository = repository;}

    @GetMapping("/routePosts")
    List<RoutePost> all() {
        return repository.findAll();
    }
    //create
    @PostMapping("/routePosts")
    RoutePost createRoutePost(@RequestBody RoutePost newRoutePost) {
        return repository.save(newRoutePost);
    }
    //get
    @GetMapping("/routePosts/{id}")
    RoutePost getRoutePost(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(()->new RoutePostNotFoundException(id));
    }
    //update
    @PutMapping("/routePosts/{id}")
    RoutePost updateRoutePost(@RequestBody RoutePost newRoutePost, @PathVariable Integer id) {
        return repository.findById(id)
                .map(routePost -> {
//                    routePost.setUser(newRoutePost.getUser());
//                    routePost.setRoute(newRoutePost.getRoute());
                    routePost.setComment(newRoutePost.getComment());
//                    routePost.setCreationDate(newRoutePost.getCreationDate());
//                    routePost.setPostType(newRoutePost.getPostType());
                    return repository.save(routePost);
                })
                .orElseThrow(() -> new RoutePostNotFoundException(id));
    }
    //delete
    @DeleteMapping("/routePosts/{id}")
    void deleteRoutePost(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
