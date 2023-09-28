import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TaskContainer from './TaskContainer';

const TaskComponent = (props: {pageStates: [any, any]}) => {

    const pageStates = props.pageStates;
    const [Tasks, setTasksState] = useState<any>([]);

    const setTasks = (data: {name: string, tasks: {id: number}[]}[]) => {
        const tasks: { id: number; }[] = []
        data.forEach((state) => {
            state.tasks.forEach((task) => {
                tasks.push(task)
            })
        })
        setTasksState(tasks)
    }


    useEffect(() => {
        fetch("/tasks?type=all").then((response) => {response.json().then((data) => {setTasks(data)})})
    }, [pageStates])
    
    if (Tasks.length === 0) {
        return
    }

    return (
        <section id={"task-component"} className={"task-component"}>
            {Tasks.map((task: {id: number}, index: number) => {return <TaskContainer key= {index} id={task.id} />})}
        </section>
    )
}
export default TaskComponent