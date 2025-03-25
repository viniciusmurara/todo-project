package com.murara.todo.controller;

import com.murara.todo.model.DTO.ToDoRequestDTO;
import com.murara.todo.model.DTO.ToDoResponseDTO;
import com.murara.todo.service.ToDoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "ToDo List", description = "Endpoints para gerenciamento de tarefas (ToDo)")
public class ToDoController {

    private final ToDoService service;

    @Autowired
    public ToDoController(ToDoService service) {
        this.service = service;
    }

    @PostMapping
    @Operation(summary = "cria uma nova tarefa")
    public ToDoResponseDTO create(@RequestBody ToDoRequestDTO todoRequestDTO) {
        return ToDoResponseDTO.mapToDTO(this.service.create(todoRequestDTO.mapToEntity()));
    }

    @GetMapping
    @Operation(summary = "lista todas as tarefas")
    public List<ToDoResponseDTO> getAll() {
        return this.service.getAll().stream().map(ToDoResponseDTO::mapToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "pega uma tarefa por id")
    public ToDoResponseDTO getById(@PathVariable int id) {
        return ToDoResponseDTO.mapToDTO(this.service.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "atualiza uma tarefa existente")
    public ToDoResponseDTO update(@RequestBody ToDoRequestDTO todoRequestDTO, @PathVariable int id) {
        return ToDoResponseDTO.mapToDTO(this.service.update(todoRequestDTO.mapToEntity(), id));
    }

    @PatchMapping("{id}")
    @Operation(summary = "atualizando apenas o status de uma tarefa existente")
    public ToDoResponseDTO updateStatus(@RequestBody ToDoRequestDTO toDoRequestDTO, @PathVariable int id) {
        return ToDoResponseDTO.mapToDTO((this.service.updateStatus(toDoRequestDTO.getStatus(), id)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "exclui uma tarefa")
    public void delete(@PathVariable int id) {
        this.service.deleteById(id);
    }
}