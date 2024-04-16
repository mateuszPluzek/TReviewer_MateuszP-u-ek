package com.example.treviewer.repositories;

import com.example.treviewer.models.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Integer> {
}
