package com.example.treviewer.controllers;

import com.example.treviewer.exceptions.RouteNotFoundException;
import com.example.treviewer.exceptions.StationPostNotFoundException;
import com.example.treviewer.models.Route;
import com.example.treviewer.models.StationPost;
import com.example.treviewer.repositories.StationPostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StationPostController {

    private StationPostRepository repository;

    public StationPostController(StationPostRepository repository){this.repository = repository;}

    @GetMapping("/stationPosts")
    List<StationPost> all() {
        return repository.findAll();
    }
    //create
    @PostMapping("/stationPosts")
    StationPost createStationPost(@RequestBody StationPost newStationPost) {
        return repository.save(newStationPost);
    }
    //get
    @GetMapping("/stationPosts/{id}")
    StationPost getStationPost(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(()->new StationPostNotFoundException(id));
    }
    //update
    @PutMapping("/stationPosts/{id}")
    StationPost updateStationPost(@RequestBody StationPost newStationPost, @PathVariable Integer id) {
        return repository.findById(id)
                .map(stationPost -> {
//                    stationPost.setUser(newStationPost.getUser());
//                    stationPost.setStation(newStationPost.getStation());
                    stationPost.setComment(newStationPost.getComment());
//                    stationPost.setCreationDate(newStationPost.getCreationDate());
//                    stationPost.setPostType(newStationPost.getPostType());
                    return repository.save(stationPost);
                })
                .orElseThrow(() -> new StationPostNotFoundException(id));
    }
    //delete
    @DeleteMapping("/stationPosts/{id}")
    void deleteStationPost(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
