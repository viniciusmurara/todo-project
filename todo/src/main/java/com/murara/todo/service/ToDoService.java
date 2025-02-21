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

    /**
     * Construtor para injeção de dependência do repository
     *
     * @param repository insância de ToDoRepository que realiza operações de persistência de dados
     */
    @Autowired
    public ToDoService(ToDoRepository repository) {
        this.repository = repository;
    }

    /**
     * Cria uma nova tarefa na lista de tarefas
     *
     * @param todo entity ToDo que vai ser persistida
     * @return todo entity criada com seu id
     * @throws RuntimeException se o objeto fornecido for nulo
     */
    public ToDo create(ToDo todo) {
        if (todo != null) {
            return this.repository.save(todo);
        }
        throw new RuntimeException("Error creating the ToDo");
    }

    /**
     * Recupera todas as tarefas cadastradas no sistema
     *
     * @return lista contendo todas as entitys existentes
     */
    public List<ToDo> getAll() {
        return this.repository.findAll();
    }

    /**
     * Busca uma tarefa específica pelo seu id
     *
     * @param id identificador da tarefa
     * @return todo entity correspondente ao id
     * @throws RuntimeException se nenhuma tarefa for encontrada com o id
     */
    public ToDo getById(int id) {
        return this.repository.findById(id).orElseThrow(() -> new RuntimeException("ToDo not found"));
    }

    /**
     * Atualiza uma tarefa existente substituindo todos seus campos
     *
     * @param todo entity com os novos dados
     * @param id identificador da tarefa a ser atualizada
     * @return todo entity atualizada
     * @throws RuntimeException se nenhuma tarefa for encontrada com o id
     */
    public ToDo update(ToDo todo, int id) {
        if (this.repository.existsById(id)) {
            todo.setId(id);
            return this.repository.save(todo);
        }
        throw new RuntimeException("ToDo not found");
    }

    /**
     * Remove permanentemente uma tarefa do sistema
     *
     * @param id identificador da tarefa a ser excluída
     * @throws RuntimeException se nenhuma tarefa for encontrada com o id
     */
    public void deleteById(int id) {
        if (this.repository.existsById(id)) {
            this.repository.deleteById(id);
            return;
        }
        throw new RuntimeException("ToDo not found");
    }
}