package com.example.treviewer.models;


import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "station_post")
public class StationPost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_station_post")
    private Integer idStationPost;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name="id_station")
    private Station station;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "creation_date")
    private Timestamp creationDate;

    @Column(name = "post_type")
    private Integer postType;

    public StationPost() {}

    public StationPost(User user, Station station, String comment, Integer rating, Timestamp creationDate, Integer postType) {
        this.user = user;
        this.station = station;
        this.comment = comment;
        this.rating = rating;
        this.creationDate = creationDate;
        this.postType = postType;
    }

    public Integer getIdStationPost() {
        return idStationPost;
    }

    public User getUser() {
        return user;
    }

    public Station getStation() {
        return station;
    }

    public String getComment() {
        return comment;
    }

    public Integer getRating() {
        return rating;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public Integer getPostType() {
        return postType;
    }

    public void setIdStationPost(Integer idStationPost) {
        this.idStationPost = idStationPost;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    public void setPostType(Integer postType) {
        this.postType = postType;
    }
}
