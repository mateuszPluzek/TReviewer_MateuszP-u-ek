package com.example.treviewer.models;

import jakarta.persistence.*;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if(this == o) {
            return true;
        }
        if(!(o instanceof Operator)) {
            return false;
        }
        Operator operator = (Operator) o;
        return Objects.equals(this.idOperator, operator.idOperator)
                && Objects.equals(this.operator, operator.operator);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.idOperator, this.operator);
    }

    @Override
    public String toString() {
        return "Id: {" + this.idOperator + "}, Operator name: {" + this.operator + "}";
    }
}
