package com.example.todolist_spring.controller;

import com.example.todolist_spring.dto.ResponseDTO;
import com.example.todolist_spring.dto.TodoDTO;
import com.example.todolist_spring.model.TodoEntity;
import com.example.todolist_spring.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("todo")
public class TodoController {

    @Autowired
    private TodoService service;

    // Todo 생성 - POST 메서드
    @PostMapping
    public ResponseEntity<?> createTodo(@RequestBody TodoDTO dto) {
        try {
            String temporaryUserId = "temporary-user";       // 임시 userid

            // 1. TodoEntity로 변환
            TodoEntity entity = TodoDTO.toEntity(dto);

            // 2. id를 null로 초기화 - 생성당시 id는 없음
            entity.setId(null);

            // 3. 임시 사용자 아이디 설정
            // 추후 인증, 인가 기능 추가할 예정
            entity.setUserId(temporaryUserId);

            // 4. 서비스 이용해 Todo엔티티 생성
            List<TodoEntity> entities = service.create(entity);

            // 5. 자바 스트림을 이용 - 엔티티 리스트를 TOdoDTO리스트로 변환
            List<TodoDTO> dtos = entities.stream()
                    .map(TodoDTO::new)
                    .collect(Collectors.toList());

            // 6. 변환된 TOdoDTO 리스트를 이용해 ResponseDTO 초기화
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .data(dtos)
                    .build();

            // 7. ResponseDTO 리턴
            return ResponseEntity.ok().body(response);
        } catch(Exception e) {
            // 8. 예외 있는 경우 dto대신 error에 메세지 넣어 리턴
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .error(error)
                    .build();

            return ResponseEntity.badRequest()
                    .body(response);
        }
    }

    // Todo 가져오기- GET메서드
    @GetMapping
    public ResponseEntity<?> retrieveTodoList() {
        String temporaryUserId = "temporary-user";       // 임시 user id

        // 1. 서비스 메서드의 retrieve()메서드 사용해 Todo리스트 가져옴
        List<TodoEntity> entities = service.retrieve(temporaryUserId);

        // 2. 자바 스트림 이용해 리턴된 엔티티 리스트를 TodoDTO 리스트로 변환
        List<TodoDTO> dtos = entities.stream()
                .map(TodoDTO::new)
                .collect(Collectors.toList());

        // 3. 변환된 TodoDTO리스트 이용해 ResponseDTO 초기화
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                .data(dtos)
                .build();

        // 4. ResponsedTO 리턴
        return ResponseEntity.ok().body(response);
    }

    // Todo Update
    @PutMapping
    public ResponseEntity<?> updateTodo(@RequestBody TodoDTO dto) {
        String temporaryUserId = "temporary-user";      // 임시 user id

        // 1. dto를 entity로 변환
        TodoEntity entity  = TodoDTO.toEntity(dto);

        // 2. id를 temporaryUserId로 초기화 - 인증, 인가 추가시 수정 예정
        entity.setUserId(temporaryUserId);

        // 3. 서비스 이용해 entity 업데이트
        List<TodoEntity> entities = service.update(entity);

        // 4. 자바 스트림 이요해 리턴된 엔티티 리스트를 TodoDTO리스트로 변환
        List<TodoDTO> dtos= entities.stream().map(TodoDTO::new).collect(Collectors.toList());

        // 5. 변환된 TodoDTO리스트 이용해 ReponseDTO 초기화
        ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                .data(dtos)
                .build();

        // 6. ResponseDTO 리턴
        return ResponseEntity.ok()
                .body(response);
    }

    // Todo delete
    @DeleteMapping
    public ResponseEntity<?> deleteTodo(@RequestBody TodoDTO dto) {
        try {
            String temporaryUserId = "temporary-user";      // temporary user id

            // 1. Todo Entity로 변환
            TodoEntity entity = TodoDTO.toEntity(dto);

            // 2. 임시 사용자 아이디 설정
            // 인증, 인가 기능 수정할 예정
            entity.setUserId(temporaryUserId);

            // 3. 서비스 이용해 entity 삭제
            List<TodoEntity> entities = service.delete(entity);

            // 4. 자바 스트림 이용 - 리턴된 엔티티 리스트를 TodoDTO리스트로 변환
            List<TodoDTO> dtos = entities.stream()
                    .map(TodoDTO::new)
                    .collect(Collectors.toList());

            // 5. 변환된 TOdoDTO리스트 이용해 ResponseDTO 초기화
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .data(dtos)
                    .build();

            // 6. ResponseDTO리턴
            return ResponseEntity.ok()
                    .body(response);
        } catch (Exception e) {
            // 7. 예외 밠애시 dto 대신 error 메세지 넣어 리턴
            String error = e.getMessage();
            ResponseDTO<TodoDTO> response = ResponseDTO.<TodoDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest()
                    .body(response);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testTodo() {
        String str = service.testService();     // 테스트 서비스 사용
        List<String> list = new ArrayList<>();
        list.add(str);
        ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();
        return ResponseEntity.ok().body(response);
    }
}
