package com.murara.todo.DTO;

import com.murara.todo.model.ToDo;
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
        return new ToDo(0, this.title, this.description, this.status, this.priority);
    }
}
