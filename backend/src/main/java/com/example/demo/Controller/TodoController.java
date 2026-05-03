package com.example.demo.Controller;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Models.Todo;
import com.example.demo.Services.TodoService;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PutMapping;
import io.swagger.v3.oas.annotations.responses.ApiResponses;



@RestController
@RequestMapping("/todos")
@Slf4j

public class TodoController {

    @Autowired
    private TodoService todoService;
    
    @PostMapping("/create")
    ResponseEntity<Todo>  Createuser(@Valid @RequestBody Todo todo){
        return new ResponseEntity<Todo>(todoService.createTodo(todo),HttpStatus.CREATED);

    }

    //path variable
        @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Todo Retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Todo was not found")
    })

    @GetMapping("/{id:[0-9]+}")
    ResponseEntity<Todo> getTodoByID(@PathVariable long id){
        return new ResponseEntity<Todo>(todoService.getTodoByid(id),HttpStatus.OK);
    }

    @GetMapping
    ResponseEntity<List<Todo>> getAllTodo(){
        return new ResponseEntity<List<Todo>>(todoService.getAllTodo(),HttpStatus.OK);
    }

    @DeleteMapping("/{id:[0-9]+}")
    public void delete(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

    @PutMapping("/{id:[0-9]+}")
    ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo todo){
        return new ResponseEntity<Todo>(todoService.updateTodo(id, todo),HttpStatus.OK);
    }
    

    @GetMapping("/page")
    ResponseEntity<Page<Todo>> getTodosPage(@RequestParam int page, @RequestParam int size){
        return new ResponseEntity<>(todoService.getAllTodoPage(page, size),HttpStatus.OK);
    }

}




