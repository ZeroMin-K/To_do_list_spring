import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddTodo extends React.Component {
    constructor(props) {
        super(prorps);
        this.state = { item: { title: "" } };       // 사용자 입력 저장할 오브젝트 
        // props의 함수를 this.add에 연결 
        this.add = props.add;
    }

    // TextField 컴포넌트의 onChange에 연결된 핸들러 함수 onInputChange 함수 
    // 사용자가 입력한 정보를 item에 저장
    onInputChange = (e) => {
        const thisItem = this.state.item;
        // 화면 inputField에 입력된 글자를 item의 title로 지정
        thisItem.title = e.target.value;
        // item 업데이트 => 사용자 todo 아이템 임시저장 
        this.setState({ item: thisItem });
        console.log(thisItem);
    }

    // +버튼 클릭시 Todo 추가   
    onButtonClick = () => {
        // add 함수 사용
        this.add(this.state.item);
        this.setState({ item: { title: ""} });
    }

    // Enter키 입력시 Todo 추가 
    enterKeyEventHandler = (e) => {     // 키보드 키 이벤트 발생시 항상 실행
        // Enter키 입력시 
        if (e.key === 'Enter') {
            // +버튼 클릭시와 동일한 기능 
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        {/* TextField에 사용자 입력이 들어올때마다 onInputChange함수 실행 */}
                        {/* Enter입력시 Todo추가 - enterKeyEventHandler() 연결 */}
                        <TextField 
                            placeholder="Add Todo here" 
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        {/* + 버튼 클릭시 Todo 추가 */}
                        <Button 
                            fullWidth 
                            color="secondary" 
                            variant="outlined"
                            onClick={this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;