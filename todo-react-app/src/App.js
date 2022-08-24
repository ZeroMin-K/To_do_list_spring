import './App.css';
import { Paper, List, Container } from "@material-ui/core";

import React from 'react';
import Todo from './Todo';
import AddTodo from "./AddTodo.js";
import { call } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  // 브라우저 접속시 Todo아이템 리스트 출력 
  // 컴포넌트가 렌더링되자마자 백엔드 API콜 구현 
  // API Service call 메서드 사용하여 API 콜 실행 
  componentDidMount() {
    // /todo에 접속하여 GET 요청시 
    call("/todo", "GET", null).then((response) => 
      this.setState({ items: response.data })
    );
  }

  // +버튼 클릭시 Todo아이템 리스트에 추가 
  add = (item) => {
    // /todo에 접속하여 POST 요청시 
    call("/todo", "POST", item).then((response) => 
      this.setState({ items: response.data})
      );
  };


  // 삭제 아이콘 클릭시 Todo 아이템 삭제
  delete = (item) => {
    // /todo에 접속하여 DELETE 요청시 
    call("/todo", "DELETE", item).then((response) => 
      this.setState({ items: response.data })
    );
  };

  // _todo 아이템 클릭 후 업데이트시 
  update = (item) => {
    // /todo에 접속하여 PUT 요청시 
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    // map 함수 사용하여 <Todo/> 컴포넌트 생성 
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (  
            <Todo 
              item={item} 
              key={item.id} 
              delete={this.delete}
              update={this.update}
            />  // _Todo컴포넌트 delete 함수, update 함수 추가하여 Todo props에 연결
          ))}
        </List>
      </Paper>
    );

    // 생성된 컴포넌트 리턴 
    return (
      <div className="App">
        <Container maxWidth="md">
          {/* App컴포넌트의 add()함수를 AddTodo의 프로퍼티로 넘겨 AddTodo에서 사용 */}
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;