package com.murara.todo.model.DTO;

import com.murara.todo.model.entity.ToDo;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ToDoRequestDTO {
    private String title;
    private String description;
    private String status;
    private int priority;

    public ToDo mapToEntity() {
        return new ToDo(null, this.title, this.description, this.status, this.priority);
    }
}
