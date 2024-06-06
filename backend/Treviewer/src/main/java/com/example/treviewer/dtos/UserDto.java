package com.example.treviewer.dtos;

import com.example.treviewer.models.User;

public class UserDto {
    private Integer idUser;
    private String email;
    private String username;
    private String userType;

    // Constructor
    public UserDto(User user) {
        this.idUser = user.getIdUser();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.userType = user.getUserType();
    }

    // Getters and setters

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}

