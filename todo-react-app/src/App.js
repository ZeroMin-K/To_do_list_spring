import './App.css';
import { Paper, List, Container } from "@material-ui/core";

import React from 'react';
import Todo from './Todo';
import AddTodo from "./AddTodo.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id:0, title: "Hello World 1", done: true },
        { id:1, title: "Hello World 2", done: false },
      ]
    };
  }

  // +버튼 클릭시 Todo아이템 리스트에 추가 
  add = (item) => {
    const thisItems = this.state.items;
    // key를 위한 id 추가
    item.id = "ID-" + thisItems.length;   
    // done 초기화
    item.done = false;      
    // 리스트에 아이템 추가
    thisItems.push(item);   
    // 업데이트는 this.setState로 반드시 진행 
    this.setState({ items: thisItems });    
    console.log("items: ", this.state.items);
  }

  render() {
    // map 함수 사용하여 <Todo/> 컴포넌트 생성 
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} />
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