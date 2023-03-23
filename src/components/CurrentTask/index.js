import { Button, Stack } from "@mui/material";
import styled from 'styled-components';

const TaskView = styled.div`
    padding: 12px 5px;
    margin-bottom: 25px;
    border: 3px solid;
`

const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;
`

const CurrentTaskWrap = styled.div`
    padding: 0 20%;
`
// const CurrentTaskWrap = styled.div`
//     width: 100%;
//     padding: 0 20%;
// `

export default function CurrentTask({ currentTask, allTaskDone, nextTask, randomTask }) {
    return (
        <CurrentTaskWrap>
            {(allTaskDone)
                ? 'Все задачи выполнены'
                :
                <div>
                    {currentTask ? <TaskView>{currentTask.content}</TaskView> : null}
                    <ButtonWrap>
                        <Button onClick={nextTask} variant="outlined">Следующая задача</Button>
                        <Button onClick={randomTask} variant="outlined">Удивите меня</Button>
                    </ButtonWrap>
                </div>
            }
        </CurrentTaskWrap>
    )
}
