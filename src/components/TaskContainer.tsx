import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { forEachChild } from 'typescript';

type Task = {
    id: number,
    title: string,
    contents: string,
    state: {name: string},
    created: Date
}

const State = (props: {task: Task, updateState: any}) => {
    const task = props.task;
    const updateState = props.updateState;

    useEffect(() => {
        const stateElement = document.getElementById("task-" + task.id + "-state")
        const statesDiv = document.getElementById("task-" + task.id + "-states") as HTMLDivElement

        stateElement?.addEventListener("click", (e) => {
            statesDiv?.classList.toggle("hide")
            for (let i = 0; i < statesDiv?.children.length; i++) {
                const child = statesDiv?.children[i] as HTMLAnchorElement
                child.classList.toggle("hidden")
        }})

        for (let i=0; i < statesDiv?.children.length; i++) {
            const child = statesDiv?.children[i] as HTMLAnchorElement
            child.addEventListener("click", (e) => {
                const state = child.classList[0].split("-")[2]

                switch (state) {
                    case "incomplete":
                        fetch("/task?type=incomplete&id=" + task.id, {method: "PATCH"}).then((res) => {res.status === 200 ? updateState({name: "incomplete"}) : console.log("error")})
                        break;
                    case "in":
                        fetch("/task?type=in progress&id=" + task.id, {method: "PATCH"}).then((res) => {res.status === 200 ? updateState({name: "in progress"}) : console.log("error")})
                        break;
                    case "complete":
                        fetch("/task?type=complete&id=" + task.id, {method: "PATCH"}).then((res) => {res.status === 200 ? updateState({name: "complete"}) : console.log("error")})
                        break;
                }
            })
        }

    }, [])

    useEffect(() => {
        const stateElement = document.getElementById("task-" + task.id + "-state")

        if (stateElement != null) {
            stateElement.classList.remove("task-state-incomplete")
            stateElement.classList.remove("task-state-in-progress")
            stateElement.classList.remove("task-state-complete")
            stateElement.classList.remove("task-state-archived")
            stateElement.classList.remove("task-state-deleted")
            stateElement.classList.add("task-state-" + task.state.name.toLowerCase().trim().replace(" ", "-"))
        }
    }, [task.state.name])

    return (
    <>
        <div id={"task-" + task.id + "-state"} className={"task-state"}></div>
        <div id={"task-" + task.id + "-states"} className='task-states-div'>
            <a className={"task-state-incomplete"}></a>
            <a className={"task-state-in-progress"}></a>
            <a className={"task-state-complete"}></a>
        </div>
    </>
 )
}


const Task = (props: { id: number, title: string, contents: string, state: {name: string}, created: Date, handleChange: any, deleteTask: any, updateTask: any, updateState: any}) => {
    const task: Task = props;
    const remove = props.deleteTask;
    const update = props.updateTask;
    const updateState = props.updateState;
    const handleChange = props.handleChange;

    return (
        <div className={"task-container"}>
            <div id={"task-" + task.id + "-body"} className={"task-body"}>
                <form id={"task-" + task.id + "-form"}>
                    <input
                    type="text"
                    id={"task-" + task.id + "-title"}
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    />
                    <textarea
                    id={"task-" + task.id + "-contents"}
                    name="contents"
                    value={task.contents}
                    onChange={handleChange}
                    />
                    <input
                    type="text"
                    id={"task-" + task.id + "-created"}
                    name="created"
                    value={new Date(task.created).toLocaleDateString()}
                    className={"task-date"}
                    disabled
                    />
                </form>
                <State task={task} updateState={updateState} />
                <a id={"task-" + task.id + "-delete"} className={"task-delete flex flex-col flex-nowrap m-auto justify-around"} onClick={remove}><FontAwesomeIcon icon={faTrash} size={"xl"} className={"text-my_white"}/></a>
                <a id={"task-" + task.id + "-update"} className={"task-update flex flex-col flex-nowrap m-auto justify-around"} onClick={update}><FontAwesomeIcon icon={faCheck} size={"xl"} className={"text-my_white"}/></a>
            </div>
        </div>
    )
}

const TaskContainer = (props: { id: number}) => {
    const [loading, setLoading] = useState(true)
    const { id } = props;
    const [dbTask, setDbTask] = useState<Task>({id: id, title: "", contents: "", state: {name: ""}, created: new Date()})
    const [task, setTask] = useState<Task>({id: id, title: "", contents: "", state: {name: ""}, created: new Date()})

    const setData = (data: Task) => {
        setTask((prev) => ({...prev, ...data}))
        setDbTask((prev) => ({...prev, ...data}))
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setTask((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const updateState = (state: {name: string}) => {
        setTask((prev) => ({...prev, state: state}))
    }

    const isUpdated = () => {
        return task.contents === dbTask.contents && task.title === dbTask.title && task.state.name === dbTask.state.name
    }

    const updateElement = () => {
        const updateElement = document.getElementById("task-" + task.id + "-update")
        if (updateElement != null) {
            if (isUpdated()) {
                updateElement.classList.add("hidden")
            } else {
                updateElement.classList.remove("hidden")
            }
        }
    }

    const updateTask = () => {
        if (isUpdated()) {return} 
        console.log(JSON.stringify({title: task.title, contents: task.contents}))
        fetch("/task?type=update&id=" + task.id, {method: "PATCH", body: JSON.stringify({title: task.title, contents: task.contents})})
            .then((response) => {response.status === 200 ? setDbTask((prev) => ({...prev, ...task})) : console.log("Error updating task")})
    }

    const deleteTask = () => {
        fetch("/tasks?id=" + id, {method: "delete"}).then((response) => {response.status === 200 ? document.getElementById("task-" + id + "-body")?.remove() : console.log("Error deleting task")})
    }

    useEffect(() => {
        fetch("/task?id=" + id)
            .then((response) => {response.json().then((data) => {setData(data)})})
            .then(() => {setLoading(false)})
    }, [])

    useEffect(() => {
        updateElement()
    }, [task, dbTask])



    return (
        loading ? <div className={"task-container loading"}></div> : <Task id={task.id} title={task.title} contents={task.contents} state={task.state} created={task.created} handleChange={handleChange} deleteTask={deleteTask} updateTask={updateTask} updateState={updateState}/>
        )
}

export default TaskContainer