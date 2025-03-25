package com.murara.todo.controller;

import com.murara.todo.model.DTO.ExceptionHandlerDTO;
import com.murara.todo.exception.NullToDoException;
import com.murara.todo.exception.ToDoNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionHandlerDTO internalServerError(Exception exception) {
        return new ExceptionHandlerDTO(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(ToDoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionHandlerDTO todoNotFound(ToDoNotFoundException exception) {
        return new ExceptionHandlerDTO(exception.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(NullToDoException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionHandlerDTO nullToDo(NullToDoException exception) {
        return new ExceptionHandlerDTO(exception.getMessage(), LocalDateTime.now());
    }
}
