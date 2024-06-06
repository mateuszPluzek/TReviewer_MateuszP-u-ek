package com.example.treviewer.controllers;

import com.example.treviewer.models.Station;
import com.example.treviewer.models.User;
import com.example.treviewer.repositories.StationRepository;
import com.example.treviewer.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class FavStationController {
    private final UserRepository userRepository;
    private final StationRepository stationRepository;

    @Autowired
    public FavStationController(UserRepository userRepository, StationRepository stationRepository) {
        this.userRepository = userRepository;
        this.stationRepository = stationRepository;
    }

    @PostMapping("/fav_stations/{userId}/{stationId}")
    public ResponseEntity<String> addFavoriteStation(@PathVariable Integer userId, @PathVariable Integer stationId) {
        User user = userRepository.findById(userId).orElse(null);
        Station station = stationRepository.findById(stationId).orElse(null);

        if (user == null || station == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        }

        user.getStations().add(station);
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.OK).body("");
    }
    @GetMapping("/fav_stations/{userId}")
    public ResponseEntity<?> getUserFavoriteStations(@PathVariable Integer userId) {
        // Find the user by userId
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            // Retrieve the user's favorite stations
            Set<Station> favoriteStations = user.getStations();
            return ResponseEntity.ok(favoriteStations);
        } else {
            // If user is not found, return 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        }
    }
    @DeleteMapping("/fav_stations/{userId}/{stationId}")
    public ResponseEntity<String> deleteFavoriteStation(@PathVariable Integer userId, @PathVariable Integer stationId) {
        User user = userRepository.findById(userId).orElse(null);
        Station station = stationRepository.findById(stationId).orElse(null);

        if (user == null || station == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        }

        if (user.getStations().contains(station)) {
            user.getStations().remove(station);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        }
    }
}

