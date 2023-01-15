import { createContext, useState } from 'react'

export const PostModifyContext = createContext()

export function PostModifyContextProvider(props) {
    const [modalPostModifyState, setModalPostModifyState] = useState({
        postModalModify: false,
    })

    const togglePostModalModify = (modalModify) => {
        if (modalModify === 'postModalModify') {
            setModalPostModifyState({
                postModalModify: true,
            })
        }
        if (modalModify === 'closePostModalModify') {
            setModalPostModifyState({
                postModalModify: false,
            })
        }
    }

    return (
        <PostModifyContext.Provider value={{ modalPostModifyState, togglePostModalModify }}>
            {props.children}
        </PostModifyContext.Provider>
    )
}
