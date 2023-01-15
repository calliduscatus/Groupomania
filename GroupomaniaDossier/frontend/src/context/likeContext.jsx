import { createContext, useState } from 'react'

export const LikeContext = createContext()

export function LikeContextProvider(props) {
    const [likeState, setLikeState] = useState({
        like: false,
    })

    const toggleLike = (likeSystem) => {
        if (likeSystem === 'likeUp') {
            setLikeState({
                like: true,
            })
        }
        if (likeSystem === 'likeNone') {
            setLikeState({
                like: false,
            })
        }
    }

    return (
        <LikeContext.Provider value={{ likeState, toggleLike }}>
            {props.children}
        </LikeContext.Provider>
    )
}
