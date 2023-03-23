import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import Form from "./components/Form";
import Task from "./components/Task";
import { v4 as uuidv4 } from "uuid";
import { Button, Grid } from "@mui/material";
import CurrentTask from "./components/CurrentTask";

const Wrap = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
`

const ListContainer = styled.div`
    display: flex;
    font-size: 18px;
    flex-direction: column;
`;

const ItemContainer = styled.div`
    background-color: #ffffff42;
    border: 1px solid black;
    border-radius: 5px;
    margin: 10px 20px;
`;

const TaskListWrap = styled.div`
    max-height: 88vh;
    display: flex;
    flex-direction: column;
`;

const DroppableWrap = styled.div`
    overflow: auto;
    padding-right: 15px;
`;

const getIndex = (i, itemList) => {
  let index = i + 1;

  if (index >= itemList.length) {
    index = 0;
  }

  if (itemList[index].isDone) {
    return getIndex(index, itemList);
  }

  return index;
}

const getRandomIndex = (itemList) => {
  const index = Math.floor(Math.random() * itemList.length);

  if (itemList[index].isDone || itemList[index].current) {
    return getRandomIndex(itemList);
  }

  return index;
}

const allTaskDone = (itemList) => {
  const result = itemList.filter((task) => task.isDone === false);

  if (result.length !== 0) {
    return false;
  }

  return true;
}

const noCurrentTask = (itemList) => {
  const result = itemList.filter((task) => task.current);

  if (result.length !== 0) {
    return false;
  }

  return true;
}

export default function App() {
  const defaultList = !localStorage.getItem("tasks-list")
    ? []
    : JSON.parse(localStorage.getItem("tasks-list"))
    ;

  const [itemList, setItemList] = useState(defaultList);
  const [currentTask, setCurrentTask] = useState();

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("tasks-list", JSON.stringify(itemList));
  }, [itemList]);

  useEffect(() => {
    let task = null;

    if (itemList.length !== 0) {

      //если нет текущих задач
      if (noCurrentTask(itemList)) {
        for (let i = 0; i < itemList.length; i++) {
          const element = itemList[i];

          //ищем задачу которая не выполнена
          if (!element.isDone) {
            task = element;
            itemList[i].current = !itemList[i].current;
            setItemList([...itemList]);
            break;
          }
        }
      } else {
        itemList.map(item => {
          if (item.current) {
            task = item;
          }
        })
      }
    }

    setCurrentTask(task);
  }, [itemList]);

  const handleMark = (index) => {
    itemList[index].isDone = !itemList[index].isDone;

    //если задача отмена как текущая
    if (itemList[index].current) {
      itemList[index].current = !itemList[index].current;
    }

    setItemList([...itemList]);
  };

  const addTask = (task) => {
    setItemList([task, ...itemList]);
  };

  const handleDelete = (index) => {
    //если задача отмена как текущая
    if (itemList[index].current) {
      itemList[index].current = !itemList[index].current;
    }

    itemList.splice(index, 1);

    setItemList([...itemList]);
  };

  const clearAllFinished = () => {
    setItemList(itemList.filter((task) => task.isDone === false));
  };

  const nextTask = () => {
    for (let i = 0; i < itemList.length; i++) {
      const element = itemList[i];

      if (element.current) {
        element.current = !element.current;

        let index = getIndex(i, itemList);

        itemList[index].current = !itemList[index].current;

        setItemList([...itemList]);
        break;
      }
    }
  }

  const randomTask = () => {
    const tasks = itemList.filter(item => !item.isDone);

    if (tasks.length > 1) {
      const index = getRandomIndex(itemList);

      itemList.map(item => {
        if (item.current) {
          item.current = !item.current
        }
      })

      itemList[index].current = !itemList[index].current;

      setItemList([...itemList]);
    }
  }

  return (
    <Wrap>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs >
          <CurrentTask
            currentTask={currentTask}
            allTaskDone={allTaskDone(itemList)}
            nextTask={nextTask}
            randomTask={randomTask}
          />
        </Grid>
        <Grid item xs={3}>
          <TaskListWrap>
            <Form addTask={addTask} clearAllFinished={clearAllFinished} />
            <DroppableWrap>
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <ListContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {itemList.map((item, index) => (
                        <Draggable key={item.content + index} draggableId={item.content + index} index={index}>
                          {(provided) => (
                            <ItemContainer
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <Task
                                key={uuidv4()}
                                index={index}
                                task={item}
                                handleMark={handleMark}
                                handleDelete={handleDelete}
                              />
                            </ItemContainer>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ListContainer>
                  )}
                </Droppable>
              </DragDropContext>
            </DroppableWrap>
          </TaskListWrap>
        </Grid>
      </Grid >
    </Wrap>
  );
}
