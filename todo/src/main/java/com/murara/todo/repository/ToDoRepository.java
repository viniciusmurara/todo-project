package com.murara.todo.repository;

import com.murara.todo.model.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Integer> {
    List<ToDo> findAllByOrderByPriorityAsc();
}
