package com.example.todolist_spring.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoEntity {
    private String id;      // 오브젝트 아이디
    private String userId;      // 오브젝트를 생성한 사용자 아이디
    private String title;       // Todo 타이틀
    private boolean done;       // todo를 완료한 경우 true(checked)
}
