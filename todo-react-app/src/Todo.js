import React from 'react';
import { 
    ListItem, 
    ListItemText, 
    InputBase, 
    Checkbox,
    ListItemSecondaryAction,
    IconButton
 } from "@material-ui/core";
 import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item };
        this.delete = props.delete;     // delete함수 연결
    }

    // delete 함수
    deleteEventHandler = () => {
        this.delete(this.state.item)
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                {/* 완료했는지 체크 박스  */}
                <Checkbox checked={item.done} disableRipple/>
                <ListItemText>
                    <InputBase
                    inputProps={{ "aria-lable":"naked"}}
                    type="text"
                    id={item.id}    // 각 리스트 구분하기 위한 id 연결
                    name={item.id}  // 각 리스트 구분하기 위한 id 연결 
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    />
                </ListItemText>

                {/* Todo 삭제 아이콘 추가하여 delete함수 연결  */}
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;