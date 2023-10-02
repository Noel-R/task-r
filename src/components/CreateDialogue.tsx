import React, { use, useEffect } from "react";

type CreateDialogueProps = {
    state: boolean,
    setState: any
}

type NewTask = {
    title: string,
    contents: string,
    stateId: number
}

const CreateDialogue = (props: CreateDialogueProps) => {
    const state = props.state;
    const setState = props.setState;

    const [form, setForm] = React.useState<NewTask>({
        title: "",
        contents: "",
        stateId: 1
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const createTask = () => {

        if (form.title == "" || form.contents == "") { return; }

        fetch("/tasks", {method: "POST", body: JSON.stringify(form)})
            .then((res) => {res.status == 200 ? setState("add") : console.log("error")})
            .then(() => {window.location.reload()});
    };

    useEffect(() => {
        const dialogue = document.getElementById("add-dialog") as HTMLDialogElement;
        const form = document.getElementById("add-dialog-form") as HTMLDialogElement;
        const close =  document.getElementById("add-dialog-close") as HTMLButtonElement;

        dialogue.addEventListener("click", (e) => {
            const rect = form.getBoundingClientRect();

            const isInDialog = (
                rect.top <= e.clientY &&
                e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX &&
                e.clientX <= rect.left + rect.width
            );

            if (!isInDialog) {
                setState("add");
            }
        });

        close.addEventListener("click", () => {
            setState("add");
        });
    }, [])


    useEffect(() => {

        const dialogue = document.getElementById("add-dialog") as HTMLDialogElement;

        if (state) {
            dialogue?.show()
        } else {
            dialogue?.close()
        }
    }, [state])

    return (
        <dialog id={"add-dialog"} className={"add-dialog"}>
            <form id={"add-dialog-form"} method="dialog">
                <label>
                    <span>Task Name</span>
                    <input type="text" name="title" value={form.title} onChange={handleChange}/>
                </label>
                <label>
                    <span>Task Description</span>
                    <textarea name="contents" value={form.contents} onChange={handleChange}></textarea>
                </label>
                <menu>
                    <button id={"add-dialog-close"} className={"add-close"}>Cancel</button>
                    <button id={"add-dialog-submit"} className={"add-submit"} onClick={createTask}>Create</button>
                </menu>
            </form>
        </dialog>
    )
}

export default CreateDialogue;