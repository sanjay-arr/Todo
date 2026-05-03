package com.example.demo.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Models.Todo;

public interface TodoRepository extends JpaRepository<Todo,Long>{
}
