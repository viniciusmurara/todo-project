package com.murara.todo.DTO;

import com.murara.todo.model.ToDo;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToDoResponseDTO {
    private int id;
    private String title;
    private String description;
    private String status;
    private int priority;

    public static ToDoResponseDTO mapToDTO(ToDo entity) {
        return new ToDoResponseDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getStatus(),
                entity.getPriority()
        );
    }
}
