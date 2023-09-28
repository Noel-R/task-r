"use client"

import Button from '@/components/Button';
import TaskComponent from '@/components/TaskComponent';
import TaskContainer from '@/components/TaskContainer';
import Taskbar from '@/components/Taskbar'
import { faFileCircleCheck, faFileCircleMinus, faFileCirclePlus, faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Home() {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [pState, setPState] = useState("default");

  const Actions = [
    {name: "add", action: () => {changeState("add")}, icon: faFileCirclePlus      , state: add},
    {name: "rmv", action: () => {changeState("rmv")}, icon: faFileCircleMinus     , state: remove},
  ]

  const unset = () => {
    setAdd(false);
    setRemove(false);
  }

  const changeState = (state: any) => {
    unset();
    if (state == pState) {
      setPState("default");
      return;
    }
    switch(state) {
      case "add":
        console.log("add");
        setAdd((add) => !add);
        setPState("add");
        break;
      case "rmv":
        console.log("rmv");
        setRemove((remove) => !remove);
        setPState("rmv");
        break;
      case "default":
        console.log("default");
        break;
    }
  }

  return (
   <main className={"w-screen h-screen bg-my_black grid grid-cols-1 sm:grid-cols-5"}>
      <Taskbar>
        {Actions.map((action: any, index) => {return <Button key={index} name={action.name} action={() => {action.action()}} icon={action.icon} state={action.state} />})}
      </Taskbar>
      <TaskComponent pageStates={[add, remove]}/>
   </main>
  )
}
