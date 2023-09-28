"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

const Button = (props: { name: any; action: any; icon: any; state: any; }) => {
    const { name, action, icon, state } = props;

    useEffect(() => {
        let button = document.getElementById("taskbar-" + name);
        if (state) {
            button?.classList.add("active");
        } else {
            button?.classList.remove("active");
        }
    }, [state])

    return (
        <a id={"taskbar-" + name}onClick={() => {action()}} className={"taskbar-button group"}><FontAwesomeIcon icon={icon} size={"lg"} /><p>{name}</p></a>
    )

}

export default Button