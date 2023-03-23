import React from "react";
import { Container, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Done } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
const Task = ({ task, handleMark, handleDelete, index }) => {
    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                padding: "7px"
            }}
        >
            <IconButton
                onClick={() => handleMark(index)}
                style={{ color: "#50fa7b" }}
            >
                {task.isDone ? <Cancel></Cancel> : <Done></Done>}
            </IconButton>
            <Typography
                variant="h5"
                style={
                    task.isDone
                        ? {
                            textDecoration: "line-through",
                            color: "gray",
                        }
                        : {}
                }
            >
                {task.content}
            </Typography>

            <IconButton
                onClick={() => handleDelete(index)}
                style={{ color: "#ff5555" }}
            >
                <Delete></Delete>
            </IconButton>
        </Container>
    );
};

export default Task;
