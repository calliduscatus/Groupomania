import { createContext, useState } from 'react'

export const PostDeleteContext = createContext()

export function PostDeleteContextProvider(props) {
    const [modalPostDeleteState, setModalPostDeleteState] = useState({
        postModalDelete: false,
    })

    const togglePostModalDelete = (modalDelete) => {
        if (modalDelete === 'postModalDelete') {
            setModalPostDeleteState({
                postModalDelete: true,
            })
        }
        if (modalDelete === 'closePostModalDelete') {
            setModalPostDeleteState({
                postModalDelete: false,
            })
        }
    }

    return (
        <PostDeleteContext.Provider value={{ modalPostDeleteState, togglePostModalDelete }}>
            {props.children}
        </PostDeleteContext.Provider>
    )
}
