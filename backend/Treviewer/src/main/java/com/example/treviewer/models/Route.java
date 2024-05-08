package com.example.treviewer.models;

import jakarta.persistence.*;

@Entity
@Table(name="routes")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_route")
    private Integer idRoute;

    @ManyToOne
    @JoinColumn(name = "id_station")
    private Station station;

    @ManyToOne
    @JoinColumn(name = "id_destination")
    private Station destination;

    @ManyToOne
    @JoinColumn(name = "id_operator")
    private Operator operator;

    @Column(name = "route_name")
    private String routeName;

    @Column(name = "route_type")
    private Integer routeType;

    public Route() {}

    public Route(Station station, Station destination, Operator operator, String routeName, Integer routeType) {
        this.station = station;
        this.destination = destination;
        this.operator = operator;
        this.routeName = routeName;
        this.routeType = routeType;
    }

    public Integer getIdRoute() {
        return idRoute;
    }

    public Station getStation() {
        return station;
    }

    public Station getDestination() {
        return destination;
    }

    public Operator getOperator() {
        return operator;
    }

    public String getRouteName() {
        return routeName;
    }

    public Integer getRouteType() {
        return routeType;
    }

    public void setIdRoute(Integer idRoute) {
        this.idRoute = idRoute;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public void setDestination(Station destination) {
        this.destination = destination;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public void setRouteType(Integer routeType) {
        this.routeType = routeType;
    }
}
