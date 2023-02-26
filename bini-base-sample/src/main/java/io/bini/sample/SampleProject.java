package io.bini.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "io.bini")
@EntityScan(basePackages = "io.bini")
public class SampleProject {
    public static void main(String[] args) {

        SpringApplication.run(SampleProject.class, args);
    }
}
