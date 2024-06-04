package com.example.treviewer.models;


import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "route_post")
public class RoutePost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_route_post")
    private Integer idRoutePost;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name="id_route")
    private Route route;

    @Column(name = "comment")
    private String comment;

    @Column(name = "creation_date")
    private Timestamp creationDate;

    @Column(name = "post_type")
    private Integer postType;

    public RoutePost() {}

    public RoutePost(User user, Route route, String comment, Integer rating, Timestamp creationDate, Integer postType) {
        this.user = user;
        this.route = route;
        this.comment = comment;
        this.creationDate = creationDate;
        this.postType = postType;
    }

    public Integer getIdRoutePost() {
        return idRoutePost;
    }

    public User getUser() {
        return user;
    }

    public Route getRoute() {
        return route;
    }

    public String getComment() {
        return comment;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public Integer getPostType() {
        return postType;
    }

    public void setIdRoutePost(Integer idRoutePost) {
        this.idRoutePost = idRoutePost;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    public void setPostType(Integer postType) {
        this.postType = postType;
    }
}