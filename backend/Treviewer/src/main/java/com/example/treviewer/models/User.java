package com.example.treviewer.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_user")
    private Integer idUser;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="user_type")
    private Integer userType;

    @ManyToMany
    @JoinTable(
            name = "fav_stations",
            joinColumns = @JoinColumn(name="id_user"),
            inverseJoinColumns = @JoinColumn(name="id_station")
    )
    Set<Station> stations;

    public User() {

    }

    public User(String username, String password, Integer userType) {
        this.username = username;
        this.password = password;
        this.userType = userType;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
}
