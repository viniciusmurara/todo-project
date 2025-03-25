package com.murara.todo.model.DTO;

import java.time.LocalDateTime;

public record ExceptionHandlerDTO(String mensagem, LocalDateTime horario) {}