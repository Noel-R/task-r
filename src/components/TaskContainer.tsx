import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

const TaskContainer = (props: { id: number}) => {
    const id = props.id;
    const [title, setTitle] = useState<string>("")
    const [contents, setContents] = useState<string>("")
    const [created, setCreated] = useState<Date>(new Date())
    const [state, setState] = useState<string>("")

    const setData = (data: { id: number, title: string, contents: string, state: {name: string}, created: Date }) => {
        setTitle(data.title)
        setContents(data.contents)
        setCreated(data.created)
        setState(data.state.name)
    }

    const deleteTask = () => {
        fetch("/tasks?id=" + id, {method: "delete"}).then((response) => {response.status === 200 ? document.getElementById("task-" + id + "-body")?.remove() : console.log("Error deleting task")})
    }

    useEffect(() => {
        fetch("/task?id=" + id).then((response) => {response.json().then((data) => {setData(data)})})
    }, [id])

    useEffect(() => {
        const stateElement = document.getElementById("task-" + id + "-state")

        if (stateElement != null) {
            stateElement.classList.remove("task-state-incomplete")
            stateElement.classList.remove("task-state-in-progress")
            stateElement.classList.remove("task-state-complete")
            stateElement.classList.remove("task-state-archived")
            stateElement.classList.remove("task-state-deleted")
            stateElement.classList.add("task-state-" + state.toLowerCase().trim().replace(" ", "-"))
        }

    }, [state])

    if (title === "") {
        return
    }

    return (
        <div id={"task-" + id + "-body"} className={"task-body"}>
            <form id={"task-" + id + "-form"} onSubmit={() => {return}}>
                <input
                    type="text"
                    id={"task-" + id + "-title"}
                    name="title"
                    value={title}
                    onChange={(event) => {
                    // Update task title here
                    setTitle(event.target.value)
                    }}
                />
                <textarea
                    id={"task-" + id + "-contents"}
                    name="contents"
                    value={contents}
                    onChange={(event) => {
                    // Update task contents here
                    setContents(event.target.value)
                    }}
                />
                <input
                    type="text"
                    id={"task-" + id + "-created"}
                    name="created"
                    value={new Date(created).toLocaleDateString()}
                    className={"task-date"}
                    disabled
                />
            </form>
            <div id={"task-" + id + "-state"} className={"task-state"}></div>
            <a id={"task-" + id + "-delete"} className={"task-delete flex flex-col flex-nowrap m-auto justify-around"} onClick={() => {deleteTask()}}><FontAwesomeIcon icon={faTrash} size={"xl"} className={"text-my_white"}/></a>
        </div>
    )
}

export default TaskContainer