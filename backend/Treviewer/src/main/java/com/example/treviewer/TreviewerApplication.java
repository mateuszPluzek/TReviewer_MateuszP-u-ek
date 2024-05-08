package com.example.treviewer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class TreviewerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TreviewerApplication.class, args);
    }

}
