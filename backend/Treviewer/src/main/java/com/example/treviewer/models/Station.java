package com.example.treviewer.models;

import jakarta.persistence.*;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if(this == o) {
            return true;
        }
        if(!(o instanceof Station)) {
            return false;
        }
        Station station = (Station) o;
        return Objects.equals(this.idStation, station.idStation) && Objects.equals(this.stationName, station.stationName)
                && Objects.equals(this.stationType, station.stationType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.idStation, this.stationName, this.stationType);
    }

    @Override
    public String toString() {
        return "Id: {" + this.idStation + "}, Name: {" + this.stationName + "}, Type: {" + this.stationType + "}";
    }
}
