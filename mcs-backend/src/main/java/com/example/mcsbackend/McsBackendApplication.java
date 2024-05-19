package com.example.mcsbackend;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableJpaAuditing
@SpringBootApplication
public class McsBackendApplication {

    @RequestMapping("/")
    String home() {
        return "Hello Wrld!";
    }

    public static void main(String[] args) {
        SpringApplication.run(McsBackendApplication.class, args);
    }

}

