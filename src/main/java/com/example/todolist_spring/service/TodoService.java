package com.example.todolist_spring.service;

import com.example.todolist_spring.model.TodoEntity;
import com.example.todolist_spring.persistence.TodoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TodoService {

    @Autowired
    private TodoRepository repository;

    // entity 받아서 Todo 서비스 추가
    public List<TodoEntity> create(final TodoEntity entity) {
        // Validations
        validate(entity);

        // 엔티티를 데이터베이스에 저장
        repository.save(entity);

        // 로그
        log.info("Entity Id: {} is saved", entity.getId());

        // 저장된 엔티티를 포함하는 새 리스트 리턴
        return repository.findByUserId(entity.getUserId());
    }

    // user id 받아서 repository에서  Todo 검색해서 가져옴
    public List<TodoEntity> retrieve(final String userId) {
        // repository의 findByUserID 사용하여 리턴
        return repository.findByUserId(userId);
    }

    // entity가 유효한지 검사
    private void validate(final TodoEntity entity) {
        if(entity == null) {
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if(entity.getUserId() == null) {
            log.warn("Unknown user");
            throw new RuntimeException("Unknow user");
        }
    }

    // Todo 업데이트
    public List<TodoEntity> update(final TodoEntity entity) {
        // 1. 저장할 엔티티 유효한지 검사
        validate(entity);

        // 2. 넘겨받은 엔티티 id를 이용해 TodoEntity 가져옴.
        // 존재하지 않은 엔티티 업데이트 불가
        final Optional<TodoEntity> original = repository.findById(entity.getId());

        // 3. 반환된 TodoEntity가 존재하면
        if(original.isPresent()) {
            // 값을 새 entity 값으로 덮어 씌움
            final TodoEntity todo = original.get();
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());

            // 4. 데이터베이스에 새 값 저장
            repository.save(todo);
        }

        // retrieve메서드를 이용해 사용자의 모든 Todo 리스트 리턴
        return retrieve(entity.getUserId());
    }

    // Todo delete
    public List<TodoEntity> delete(final TodoEntity entity) {
        // 1. 저장할 엔티티 유효한지 확인
        validate(entity);

        try {
            // 2. 엔티티 삭제
            repository.delete(entity);
        } catch(Exception e) {
            // 3. exception 발생시 id, exception 로깅
            log.error("error deleting entity ", entity.getId(), e);

            // 4. 컨트롤러로 exception보냄.
            // 데이터베이스 내부 로직 캡슐화하기위해 e 리턴하지 않고 새 exception 오브젝트 리턴
            throw new RuntimeException("error deleteing entity " + entity.getId());
        }
        // 5. 새 Todo리스트 가져와 리턴
        return retrieve(entity.getUserId());
    }

    public String testService() {
        // TodoEntity 생성
        TodoEntity entity = TodoEntity.builder().title("My first todo item").build();

        // TodoEntity 저장
        repository.save(entity);

        // TodoEntity 검색
        TodoEntity savedEntity = repository.findById(entity.getId()).get();
        return savedEntity.getTitle();
    }
}
