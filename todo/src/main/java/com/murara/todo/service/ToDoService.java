package com.murara.todo.service;

import com.murara.todo.exception.NullToDoException;
import com.murara.todo.exception.ToDoNotFoundException;
import com.murara.todo.model.ToDo;
import com.murara.todo.repository.ToDoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ToDoService {

    private final ToDoRepository repository;

    public ToDo create(ToDo todo) {
        if (todo != null) {
            return this.repository.save(todo);
        }
        throw new NullToDoException("ToDo is null or empty");
    }

    public List<ToDo> getAll() {
        return this.repository.findAllByOrderByPriorityAsc();
    }

    public ToDo getById(int id) {
        return this.repository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
    }

    public ToDo update(ToDo todo, int id) {
        if (this.repository.existsById(id)) {
            todo.setId(id);
            return this.repository.save(todo);
        }
        throw new ToDoNotFoundException("ToDo not found");
    }

    public ToDo updateStatus(String status, int id) {
        ToDo todo = repository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));

        todo.setStatus(status);
        return this.repository.save(todo);
    }

    public void deleteById(int id) {
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return;
        }
        throw new RuntimeException("ToDo not found");
    }
}