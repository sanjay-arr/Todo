package com.example.demo.Models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue()
    private Long id;

    @NotNull
    @NotBlank
    @Schema(name="title",example = "completed spring boot")
    private String title;

    @com.fasterxml.jackson.annotation.JsonProperty("is_completed")
    private Boolean is_completed;

}

