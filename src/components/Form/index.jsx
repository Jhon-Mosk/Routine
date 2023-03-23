import React, { useState } from "react";
import { Container, IconButton, Input } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

const Form = ({ addTask, clearAllFinished }) => {
    const [formValue, setFormValue] = useState({
        content: "",
        isDone: false,
        current: false
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        addTask(formValue);
        setFormValue({ content: "", isDone: false, current: false });
    };

    return (
        <Container style={{ "margin-bottom": "10px" }}>
            <form
                style={{
                    "display": "flex",
                    "padding-right": "20px"
                }}
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder="Введите текст задачи"
                    autoFocus
                    inputProps={{ maxLength: 40 }}
                    style={{
                        'background': "#ffffff42",
                        "color": "#bd93f9",
                        "padding": "2px 7px",
                        "flex-grow": "1"
                    }}
                    required
                    variant="outlined"
                    value={formValue.content}
                    onChange={(e) =>
                        setFormValue({ ...formValue, content: e.target.value })
                    }
                />
                <IconButton variant="contained" color="primary" type="submit">
                    <AddTaskIcon />
                </IconButton>
                <IconButton variant="contained" onClick={clearAllFinished}>
                    <RemoveDoneIcon color="primary" />
                </IconButton>
            </form>
        </Container>
    );
};

export default Form;
