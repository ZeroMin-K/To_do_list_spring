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
        this.state = { item: props.item, readOnly: true };      // title 변경 가능한지 readonly 변수 추가 
        this.delete = props.delete;     // delete함수 연결
        this.update = props.update;     // update를 this.update에 할당하여 update 함수 연결 
    }

    // delete 함수
    deleteEventHandler = () => {
        this.delete(this.state.item)
    }

    // title 클릭시 readOnly를 false로 변경해주는 함수 - 수정 가능 상태 
    offReadOnlyMode = () => {
        console.log("Event", this.state.readOnly)
        // 현재 Todo readOnly false로 변경
        this.setState({ readOnly: false } , () => {
            console.log("ReadOnly? ", this.state.readOnly)
        });    
    }

    // enter키 누르면 readonly를 true로 변경하는 함수 - 수정 완료, 수정내용 저장
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true});
            this.update(this.state.item);           // update함수를 통해 todo 아이템 저장 
        }
    }

    // item 수정 함수 - 키보드 키 입력할때마다 item을 새값으로 변경
    editEventHandler = (e) => {
        // 현재 아이템 
        const thisItem = this.state.item;
        // 키 입력때마다 title 변경
        thisItem.title = e.target.value;
        // 변경될 title로 새로 아이템 저장 
        this.setState({ item: thisItem});
    }

    // checkbox 클릭시 done true-> false, false-> true로 변경
    checkboxEventHandler = (e) => {
        // 현재 아이템 
        const thisItem = this.state.item;
        // 현재 아이템 done을 반대로 변경 
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem });
    }



    render() {
        const item = this.state.item;
        return (
            <ListItem>
                {/* 완료했는지 체크 박스  */}
                {/* 체크 박스 클릭시 done 변경  */}
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler}/>
                <ListItemText>
                    {/* title 클릭시 offReadOnlyMode함수 실행 readonly false로 변경 */}
                    {/* enter키 입력시 enterKeyEventHandler함수 실행, readonly true로 변경 */}
                    {/* 키 입력할때마다 editEventHandler 함수 실행, Todo아이템 업데이트  */}
                    {/* 각 리스트 구분하기 위한 id 연결 */}
                    <InputBase
                        inputProps={{ 
                            "aria-lable":"naked",
                            readOnly: this.state.readOnly,
                        }} 
                        onClick={this.offReadOnlyMode}      
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                        type="text"
                        id={item.id}    
                        name={item.id}  
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