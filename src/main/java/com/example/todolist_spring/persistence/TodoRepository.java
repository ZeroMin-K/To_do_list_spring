package com.example.todolist_spring.persistence;

import com.example.todolist_spring.model.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, String> {

    // 사용자 ID로 TodoRepository 검색해서 새 Todo 리스트 반환
    List<TodoEntity> findByUserId(String userId);
}
