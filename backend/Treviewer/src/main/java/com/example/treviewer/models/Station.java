package com.example.treviewer.models;

import jakarta.persistence.*;

@Entity
@Table(name = "stations")
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_station")
    private Integer idStation;

    @Column(name="station_name")
    private String stationName;

    @Column(name="station_type")
    private Integer stationType;

    public Station() {}

    public Station(String stationName, Integer stationType) {
        this.stationName = stationName;
        this.stationType = stationType;
    }

    public void setIdStation(Integer idStation) {
        this.idStation = idStation;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public void setStationType(Integer stationType) {
        this.stationType = stationType;
    }

    public Integer getIdStation() {
        return idStation;
    }

    public String getStationName() {
        return stationName;
    }

    public Integer getStationType() {
        return stationType;
    }
}
