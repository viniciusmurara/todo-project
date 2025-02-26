package com.murara.todo.service;

import com.murara.todo.model.ToDo;
import com.murara.todo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * ToDoService é responsável pela lógica de negócios do gerenciamento de tarefas
 * Além de ser intermediária entre o controller e o repository
 *
 * @author Vinicius Murara
 */
@Service
public class ToDoService {

    private final ToDoRepository repository;

    @Autowired
    public ToDoService(ToDoRepository repository) {
        this.repository = repository;
    }

    public ToDo create(ToDo todo) {
        if (todo != null) {
            return this.repository.save(todo);
        }
        throw new RuntimeException("Error creating the ToDo");
    }

    public List<ToDo> getAll() {
        return this.repository.findAll();
    }

    public ToDo getById(int id) {
        return this.repository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
    }

    public ToDo update(ToDo todo, int id) {
        if (this.repository.existsById(id)) {
            todo.setId(id);
            return this.repository.save(todo);
        }
        throw new RuntimeException("ToDo not found");
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