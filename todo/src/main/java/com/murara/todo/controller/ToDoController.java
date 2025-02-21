package com.murara.todo.controller;

import com.murara.todo.DTO.ToDoRequestDTO;
import com.murara.todo.DTO.ToDoResponseDTO;
import com.murara.todo.service.ToDoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "cria uma nova tarefa", description = "cria uma nova tarefa na lista de tarefas")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "tarefa criada com sucesso",
                    content = @Content(schema = @Schema(implementation = ToDoResponseDTO.class),
                    examples = @ExampleObject(value = "{'id': 1, 'title': 'estudar', 'description': 'estudar React Hooks', 'completed': false}"))),
            @ApiResponse(responseCode = "400", description = "dados inseridos são inválidos",
                    content = @Content(examples = @ExampleObject(value = "{'message': 'Título é obrigatório'}")))
    })
    public ToDoResponseDTO create(
            @RequestBody
            @Parameter(description = "dados para criação da tarefa", required = true,
                    content = @Content(schema = @Schema(implementation = ToDoRequestDTO.class),
                    examples = @ExampleObject(value = "{'title': 'estudar', 'description': 'estudar React Hooks', 'completed': false}")))
            ToDoRequestDTO todoRequestDTO) {
        return ToDoResponseDTO.mapToDTO(this.service.create(todoRequestDTO.mapToEntity()));
    }

    @GetMapping
    @Operation(summary = "lista todas as tarefas", description = "retorna uma lista completa de todas as tarefas cadastradas")
    @ApiResponse(responseCode = "200", description = "lista de tarefas recuperada com sucesso",
            content = @Content(schema = @Schema(implementation = ToDoResponseDTO.class),
            examples = @ExampleObject(value = "[{'id': 1, 'title': 'estudar', 'description': 'estudar Spring Boot', 'completed': false}]")))
    public List<ToDoResponseDTO> getAll() {
        return this.service.getAll().stream().map(ToDoResponseDTO::mapToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "pega uma tarefa por id", description = "recupera os detalhes de uma tarefa específica usando o id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "tarefa encontrada",
                    content = @Content(schema = @Schema(implementation = ToDoResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "tarefa não encontrada",
                    content = @Content(examples = @ExampleObject(value = "{'message': 'tarefa com id 999 não encontrada'}")))
    })
    public ToDoResponseDTO getById(
            @PathVariable
            @Parameter(description = "id da tarefa", required = true, example = "1")
            int id) {
        return ToDoResponseDTO.mapToDTO(this.service.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "atualiza uma tarefa existente", description = "atualiza todos os campos de uma tarefa existente usando id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "tarefa atualizada com sucesso",
                    content = @Content(schema = @Schema(implementation = ToDoResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "tarefa não encontrada para atualização")
    })
    public ToDoResponseDTO update(
            @RequestBody
            @Parameter(description = "dados da tarefa atualizados", required = true,
                    content = @Content(schema = @Schema(implementation = ToDoRequestDTO.class),
                    examples = @ExampleObject(value = "{'title': 'estudar atualizado', 'description': 'estudar Spring Boot', 'completed': true}")))
            ToDoRequestDTO todoRequestDTO,
            @PathVariable int id) {
        return ToDoResponseDTO.mapToDTO(this.service.update(todoRequestDTO.mapToEntity(), id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "exclui uma tarefa", description = "remove permanentemente uma tarefa específica usando id")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "tarefa excluída com sucesso"),
            @ApiResponse(responseCode = "404", description = "tarefa não encontrada para exclusão")
    })
    public void delete(
            @PathVariable
            @Parameter(description = "id da tarefa a ser excluída", required = true, example = "1")
            int id) {
        this.service.deleteById(id);
    }
}