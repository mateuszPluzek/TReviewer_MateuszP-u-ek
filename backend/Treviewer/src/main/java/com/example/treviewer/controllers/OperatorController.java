package com.example.treviewer.controllers;

import com.example.treviewer.exceptions.OperatorNotFoundException;
import com.example.treviewer.models.Operator;
import com.example.treviewer.repositories.OperatorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OperatorController {

    private OperatorRepository repository;

    OperatorController(OperatorRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/operators")
    List<Operator> all() {
        return repository.findAll();
    }
    //create
    @PostMapping("/operators")
    Operator createOperator(@RequestBody Operator newOperator) {
        return repository.save(newOperator);
    }
    //get
    @GetMapping("/operators/{id}")
    Operator getOperator(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(()->new OperatorNotFoundException(id));
    }
    //update
//    @PutMapping("/operators/{id}")
//    Operator updateOperator(@RequestBody Operator newOperator, @PathVariable Integer id) {
//        return repository.findById(id).map(
//                operator -> {
//                    operator.setIdOperator(newOperator.getIdOperator());
//                    operator.setOperator(newOperator.getOperator());
//                    return repository.save(operator);
//                }
//        ).orElseGet(() -> {
//            newOperator.setIdOperator(id);
//            return repository.save(newOperator);
//        });
//    }
    //delete
    @DeleteMapping("/operators/{id}")
    void deleteOperator(@PathVariable Integer id) {
        repository.deleteById(id);
    }


}
