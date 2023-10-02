import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'
import TaskContainer from './TaskContainer';
import Loading from '@/app/loading';

const TaskComponent = () => {
    const [Tasks, setTasksState] = useState<any>([]);
    const [Loaded, setLoaded] = useState(false);

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
        fetch("/tasks?type=all")
            .then((response) => {response.json().then((data) => {setTasks(data)})})
            .then(() => {setLoaded(true)})
    }, [])

    return ( !Loaded ? <Loading /> :
            <section id={"task-component"} className={"task-component"}>
                {Tasks.map((task: {id: number}, index: number) => {return <TaskContainer key= {index} id={task.id} />})}
            </section>
    )
}
export default TaskComponent