import './App.css';
import { Paper, List, Container } from "@material-ui/core";

import React from 'react';
import Todo from './Todo';
import AddTodo from "./AddTodo.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
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

  // 삭제 아이콘 클릭시 Todo 아이템 삭제
  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before Update Items: ", this.state.items)
    // id비교해 매개변수로 넘어온 item과 id같은 경우 제외
    const newItems = thisItems.filter(e => e.id !== item.id);
    // 삭제 후 새 items를 stae에 저장 
    this.setState({ items: newItems }, () => {
      console.log("Update Items: ", this.state.items)
    });
  }

  render() {
    // map 함수 사용하여 <Todo/> 컴포넌트 생성 
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (  
            <Todo item={item} key={item.id} delete={this.delete}/>  // Todo컴포넌트 delete 함수 추가 
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