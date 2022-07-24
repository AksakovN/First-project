import React, { useState } from "react";
export const IsOpenContext = React.createContext({});

export default function IsOpenContextProvider({ children }) {

    const [isOpen, setisOpen] = useState(false);
    const [listIsOpen, setlistIsOpen] = useState(false);
    const [listDelete, setlistDelete] = useState(false);
    const [searchOpen, setsearchOpen] = useState(false);
    const [modal, setmodal] = useState(false);
    const [modalLogin, setmodalLogin] = useState(false);
    const [modalAvatar, setmodalAvatar] = useState(false);
    const [isLogin, setisLogin] = useState(false);
    const [todoID, settodoID] = useState(0);
    const [modalClose, setmodalClose] = useState(0);
    const [renderTodo, setrenderTodo] = useState(0);
    const [isEdit, setisEdit] = useState(0);
    const [searchResult, setsearchResult] = useState(null);
    const [todoListArr, setTodoListArr] = useState(null);
    const [avatar, setavatar] = useState(0);

    return (
        <IsOpenContext.Provider
            value={{
                isOpen, setisOpen,
                modal, setmodal,
                todoID, settodoID,
                modalClose, setmodalClose,
                renderTodo, setrenderTodo,
                isEdit, setisEdit,
                listIsOpen, setlistIsOpen,
                listDelete, setlistDelete,
                searchOpen, setsearchOpen,
                searchResult, setsearchResult,
                todoListArr, setTodoListArr,
                modalLogin, setmodalLogin,
                isLogin, setisLogin,
                avatar, setavatar,
                modalAvatar, setmodalAvatar,
            }}
        >
            {children}
        </IsOpenContext.Provider>
    )
}