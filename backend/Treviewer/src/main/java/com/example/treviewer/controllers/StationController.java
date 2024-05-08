package com.example.treviewer.controllers;

import com.example.treviewer.exceptions.StationNotFoundException;
import com.example.treviewer.models.Station;
import com.example.treviewer.repositories.StationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StationController {

    private StationRepository repository;

    StationController(StationRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/stations")
    List<Station> all() {
        return repository.findAll();
    }
    //create
    @PostMapping("/stations")
    Station createStation(@RequestBody Station newStation) {
        return repository.save(newStation);
    }
    //get
    @GetMapping("/stations/{id}")
    Station getStation(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(()->new StationNotFoundException(id));
    }
    //update
    @PutMapping("/stations/{id}")
    Station updateStation(@RequestBody Station newStation, @PathVariable Integer id) {
        return repository.findById(id).map(
                station -> {
                    station.setStationName(newStation.getStationName());
                    station.setStationType(newStation.getStationType());
                    return repository.save(station);
                }
        ).orElseGet(()-> {
            newStation.setIdStation(id);
            return repository.save(newStation);
        });
    }
    //delete
    @DeleteMapping("/stations/{id}")
    void deleteStation(@PathVariable Integer id) {
        repository.deleteById(id);
    }

}
