package com.murara.todo.controller;

import com.murara.todo.DTO.ToDoRequestDTO;
import com.murara.todo.DTO.ToDoResponseDTO;
import com.murara.todo.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173")
public class ToDoController {

    private ToDoService service;

    @Autowired
    public ToDoController(ToDoService service) {
        this.service = service;
    }

    @PostMapping
    public ToDoResponseDTO create(@RequestBody ToDoRequestDTO todoRequestDTO) {
        return ToDoResponseDTO.mapToDTO(this.service.create(todoRequestDTO.mapToEntity()));
    }

    @GetMapping
    public List<ToDoResponseDTO> getAll() {
        return this.service.getAll().stream().map(ToDoResponseDTO::mapToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ToDoResponseDTO getById(@PathVariable int id) {
        return ToDoResponseDTO.mapToDTO(this.service.getById(id));
    }

    @PutMapping("/{id}")
    public ToDoResponseDTO update(@RequestBody ToDoRequestDTO todoRequestDTO, @PathVariable int id) {
        return ToDoResponseDTO.mapToDTO(this.service.update(todoRequestDTO.mapToEntity(), id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        this.service.deleteById(id);
    }
}
