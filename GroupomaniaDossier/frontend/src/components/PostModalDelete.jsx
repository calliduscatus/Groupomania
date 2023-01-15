import React, { useContext, useState, useEffect } from 'react'
import { PostDeleteContext } from '../context/postDeleteModalContext'
import AuthContext from '../context/authContext'
import styled from 'styled-components'
import colors from '../style/Colors'

const ModalPost = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.secondary};
    border-radius: 20px;
    border: solid 2px;
    border-color: ${colors.tertiary};
    z-index: 11;
    @media screen and (max-width: 961px) {
        width: 90%;
    }
`

const ModalBody = styled.div`
    width: 600px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 26px;
    margin-top: 20px;
    text-align: center;
    color: ${colors.tertiary};
    @media screen and (max-width: 961px) {
        width: 100%;
    }
`
const Paragraph = styled.div`
    width: 100%;
    margin-top: -20px;
`

const ContenairButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

const Button = styled.button`
    width: 20%;
    height: 50px;
    background-color: ${colors.tertiary};
    border-radius: 10px;
    border: none;
    color: ${colors.secondary};
    text-align: center;
    font-size: 20px;
    filter: brightness(130%);
    &:hover {
        filter: brightness(100%);
        transition-delay: 120ms;
        transition-duration: 300ms;
    }
`

const Over = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${colors.tertiary};
    opacity: 0.75;
    z-index: 10;
`

let valuePicturePost

function PostModalDelete({ postIdForDelete, dataResult }) {
    const authContext = useContext(AuthContext)
    const [dataResultPost, setdataResultPost] = useState({ post: {} })
    const [filePost, setFilePost] = useState({ file: null })
    const urlGet = 'http://localhost:4200/api/ficheUser/' + authContext.userId
    const { modalPostDeleteState, togglePostModalDelete } =
        useContext(PostDeleteContext)
        
        useEffect(() => {
            if(postIdForDelete !== null) {
            const fetchHandler = async () => {
                const response = await fetch('http://localhost:4200/api/ficheUser/post/one/' +
                postIdForDelete, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authContext.token}`,
                    },
                })
    
                const dataResponse = await response.json()
                if (response.ok) {
                    setdataResultPost({ post: dataResponse })
                }
            }
    
            fetchHandler()
        }
        }, [])

        const formDataPostPicture = new FormData()
        let newPostUserPicture = {
            firstname: dataResultPost.post.firstname,
            lastname: dataResultPost.post.lastname,
            imageUrlPostPicture: dataResultPost.post.imageUrlPostPictur,
            imageUrlPostProfil: dataResultPost.post.imageUrlProfilePicture,
            postContent: dataResultPost.post.postContent,
            userId: dataResultPost.post.userId
        }
    
        const formDataPost = new FormData()
        let newPostUser = {
            firstname: dataResultPost.post.firstname,
            lastname: dataResultPost.post.lastname,
            imageUrlPostProfil: dataResultPost.post.imageUrlProfilePicture,
            postContent: dataResultPost.post.postContent,
            userId: dataResultPost.post.userId
        }

    const deletePost = async () => {
            if (dataResultPost.post.imageUrlPostPicture) {
                formDataPostPicture.append(
                    'post',
                    JSON.stringify(newPostUserPicture)
                )
                formDataPostPicture.append('image', filePost.file)
                try {
                    const response = await fetch('http://localhost:4200/api/ficheUser/post/one/' +
                    postIdForDelete, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json, test/plain',
                            Authorization: `Bearer ${authContext.token}`,
                        },
                        body: formDataPostPicture,
                    })
                    const dataResponse = await response.json()
                    if (response.ok) {
                        window.location = document.location
                    }
                } catch (err) {
                    console.log(err)
                }
            }
    
            // if (valuePicturePost === null) {
                else {
                //formDataPost.append('post', JSON.stringify(newPostUser))
                try {
                    const response = await fetch('http://localhost:4200/api/ficheUser/post/one/' +
                    postIdForDelete, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authContext.token}`,
                        },
                        body: JSON.stringify(newPostUser)
                    })
                    const dataResponse = await response.json()
                    if (response.ok) {
                        //setDataResultPostsSend(dataResponse)
                        window.location = document.location
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }




    return (
        <>
            {modalPostDeleteState.postModalDelete && (
                <div>
                    <Over
                        onClick={() =>
                            togglePostModalDelete('closePostModalDelete')
                        }
                    ></Over>
                    <ModalPost>
                        <ModalBody>
                            <Paragraph>Supprimer cette publication ?</Paragraph>
                            <ContenairButtons>
                                <Button onClick={deletePost}>Oui</Button>
                                <Button
                                    onClick={() =>
                                        togglePostModalDelete(
                                            'closePostModalDelete'
                                        )
                                    }
                                >
                                    Non
                                </Button>
                            </ContenairButtons>
                        </ModalBody>
                    </ModalPost>
                </div>
            )}
        </>
    )
}

export default PostModalDelete
