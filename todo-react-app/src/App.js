import './App.css';
import { Paper, List } from "@material-ui/core";

import React from 'react';
import Todo from './Todo';

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
    return <div className="App">{todoItems}</div>;
  }
}

export default App;