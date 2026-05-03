package com.example.demo.Services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Models.Todo;
import com.example.demo.Repository.TodoRepository;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;
    
    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public Todo getTodoByid(Long id){
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    public List<Todo> getAllTodo(){
        return todoRepository.findAll();
    }

    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

    public Todo updateTodo(Long id,Todo newtodo){
        Todo old =todoRepository.findById(id).orElse(null);

        if(old!=null){
            old.setTitle(newtodo.getTitle());
            old.setIs_completed(newtodo.getIs_completed());

            return todoRepository.save(old);
        }
        return null;
    }

    public Page<Todo> getAllTodoPage(int page,int size){
        Pageable pageable =PageRequest.of(page,size);
        return todoRepository.findAll(pageable);
    }
	
}
