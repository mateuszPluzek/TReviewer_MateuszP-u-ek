package com.example.treviewer.models;

import jakarta.persistence.*;

@Entity
@Table(name = "operators")
public class Operator {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_operator")
    private Integer idOperator;

    @Column(name="operator")
    private String operator;

    public Operator() {}

    public Operator(String operator) {
        this.operator = operator;
    }

    public Integer getIdOperator() {
        return idOperator;
    }

    public String getOperator() {
        return operator;
    }

    public void setIdOperator(Integer idOperator) {
        this.idOperator = idOperator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
