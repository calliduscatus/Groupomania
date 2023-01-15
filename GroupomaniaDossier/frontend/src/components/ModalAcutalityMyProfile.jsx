import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../context/postContext'
import { PostModifyContext } from '../context/postModifyModalContext'
import { PostDeleteContext } from '../context/postDeleteModalContext'
import AuthContext from '../context/authContext'
import PostModal from '../components/PostModal'
import PostModalModify from '../components/PostModalModify'
import PostModalDelete from '../components/PostModalDelete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faPhotoFilm } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import colors from '../style/Colors'
import '../styles/StyleButton.css'
import '../styles/LikeButton.css'
import '../styles/DisplayModalsMenu.css'
import '../styles/Post.css'

const ContenairMenuModals = styled.div`
    width: 72%;
    margin-bottom: 20px;
    margin-left: 27%;
    margin-top: 18%;
    @media screen and (max-width: 961px) {
        width: 100%;
        margin-left: 0%;
        opacity: 0;
        animation-name: displayModalsMenu;
        animation-duration: 150ms;
        animation-fill-mode: forwards;
    }
`

const Post = styled.div`
    width: 96%;
    height: 150px;
    min-height: 140px;
    background-color: ${colors.secondary};
    border-radius: 10px;
    box-shadow: 0 0 3px ${colors.secondary};
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    top: -20px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 961px) {
        position: relative;
        top: 40px;
    }
`

const PictureUserPostWrite = styled.div`
    width: 50px;
    height: 50px;
    border: 2px solid ${colors.tertiary};
    border-radius: 100%;
    background-color: #f8f1f1;
    margin-top: 14px;
    margin-left: -14px;
    @media screen and (max-width: 961px) {
        margin-left: -4px;
    }
`

const InputPost = styled.div.attrs({
    id: 'inputClick',
    className: 'elementsEvents',
})`
    width: 84%;
    height: 40px;
    border: 1px solid ${colors.tertiary};
    border-radius: 12px;
    background-color: #f8f1f1;
    margin-top: 20px;
    cursor: none;
    &:hover {
        filter: brightness(94%);
        transition-delay: 100ms;
        transition-duration: 300ms;
    }
    @media screen and (max-width: 961px) {
        width: 74%;
    }
`

const ParagraphPost = styled.div`
    color: ${colors.tertiary};
    opacity: 0.6;
    font-size: 18px;
    margin-top: 8px;
    margin-left: 6px;
`

const ContenairAllPosts = styled.div`
    display: flex;
    flex-direction: column-reverse;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
`

const Separator = styled.div`
    width: 94%;
    height: 1px;
    background-color: ${colors.tertiary};
    opacity: 0.24;
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
`

const DivIconPicture = styled.div`
    width: 100%;
    height: 40px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /* display: flex;
justify-content: space-around; */
`
const BlockOptionPicture = styled.div.attrs({
    className: 'elementsEvents',
})`
    width: 16%;
    height: 50px;
    position: relative;
    top: 4px;
    left: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    background-color: ${colors.secondary};
    &:hover {
        filter: brightness(90%);
        transition-delay: 100ms;
        transition-duration: 300ms;
    }
`
const ParagraphIcon = styled.div`
    display: flex;
    margin-top: 10px;
    margin-left: 30px;
    color: ${colors.tertiary};
`
const ParagraphNameIcon = styled.p`
    margin-left: 16px;
    position: relative;
    bottom: 16px;
    font-size: 20px;
`

const DivInput = styled.div`
    display: flex;
    justify-content: space-around;
`
const InputPicture = styled.input.attrs({
    type: 'file',
    accept: 'jpeg, jpg, png',
    id: 'picturePost',
    name: 'postPicture',
})`
    width: 0.01%;
    height: 0%;
    position: absolute;
    color: ${colors.tertiary};
    border-color: ${colors.tertiary};
`

const EndPosts = styled.div.attrs({
    id: 'endPosts',
})`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    font-size: 30px;
    text-align: center;
    line-height: 2em;
    margin-top: 60px;
    margin-bottom: auto;
    color: ${colors.secondary};
`

const ContenairOptionsPosts = styled.div.attrs({
    className: 'elementsEvents',
})`
    width: 220px;
    height: 100px;
    background-color: #ffd7d7;
    filter: brightness(95%);
    margin-top: 40px;
    position: absolute;
    right: 40%;
    top: 6%;
    border-radius: 6px;
    z-index: 1;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
`

const ContenairOptionsPostsArrow = styled.div`
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 22px 22px 22px;
    border-color: transparent transparent #ffd7d7 transparent;
    filter: brightness(100%);
    transform: rotate(270deg);
    position: absolute;
    right: -5%;
    top: -4%;
    border-radius: 6px;
    z-index: -1;
`

const BlockButtonChangePost = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffd7d7;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index: 1;
`

const ButtonOptionsChangePost = styled.div.attrs({
    className: 'elementsEvents',
})`
    width: 94%;
    height: 40%;
    background-color: #ffd7d7;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    text-align: center;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    cursor: none;
    &:hover {
        filter: brightness(95%);
    }
`

const DivFontLetterUser = styled.div`
    width: 102%;
    height: 102%;
    background-color: ${colors.primary};
    border-radius: 50%;
    filter: brightness(250%);
    margin-top: -25px;
    margin-left: -1px;
    text-align: center;
`

let valuePicturePost

function Actuality() {
    const authContext = useContext(AuthContext)
    const { togglePostModalModify } = useContext(PostModifyContext)
    const { togglePostModalDelete } = useContext(PostDeleteContext)
    const urlGet =
        'http://localhost:4200/api/ficheUser/post/' + authContext.userId
    const urlGetInfosUser =
        'http://localhost:4200/api/ficheUser/' + authContext.userId
    const urlGetInfoAllsUser = 'http://localhost:4200/api/ficheUser/'
    const [dataResultPosts, setDataResultPosts] = useState([])
    const [dataResult, setDataResult] = useState({ infos: {} })
    const [dataResultUsers, setDataResultUsers] = useState({ infos: {} })
    const [postIdForModify, setpostIdForModify] = useState(null)
    const [postIdForDelete, setpostIdForDelete] = useState(null)
    const [picturePost, setPicturePost] = useState(false)
    const [pictureData, setPictureData] = useState(false)
    const [displayImg, setdisplayImg] = useState(false)
    const [filePost, setFilePost] = useState({ file: null })
    const [isDataLoading, setDataLoading] = useState(false)
    const { togglePostModal } = useContext(PostContext)

    
console.log(dataResult.infos)

    useEffect(() => {
        setDataLoading(true)
        fetch(urlGet, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => setDataResultPosts([...data]))
            .catch(function (error) {
                alert('HTTP Error ' + error.status)
            })
        setDataLoading(false)
    }, [])

    useEffect(() => {
        fetch(urlGetInfosUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => setDataResult({ infos: data }))
            .catch(function (error) {
                alert('HTTP Error ' + error.status)
            })
    }, [])

    useEffect(() => {
        fetch(urlGetInfoAllsUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => setDataResultUsers([...data]))
            .catch(function (error) {
                alert('HTTP Error ' + error.status)
            })
    }, [])

    const pictureUser = dataResult.infos.imageUrlProfilePicture

    useEffect(() => {
        if (dataResultPosts.imageUrlPostPicture !== ' ') {
            setPicturePost(true)
        }
    }, [picturePost])

    useEffect(() => {
        setTimeout(() => {
                const endPosts = document.querySelector('#endPosts')
                if (dataResultPosts !== undefined) {
                    if (dataResultPosts.length === 0) {
                        endPosts.innerHTML =
                            'Malheur ! Aucun post ! </br> Et si vous lanciez la tendance...'
                    } else {
                        endPosts.innerHTML =
                            'Diantre ! Déjà la fin... </br> Et si vous relanciez le mouvement ?'
                    }
                }
        }, 2000)
    }, [dataResultPosts])

    const clickInput = () => {
        document.querySelector('#picturePost').click()
    }

    const pictureLandscape = (e) => {
        let fileUpload = e.target.files[0]
        setFilePost({ file: fileUpload })
        setdisplayImg(true)
    }
    valuePicturePost = filePost

    useEffect(() => {
        if (valuePicturePost.file !== null) {
            document.querySelector('#inputClick').click()
        }
    }, [filePost])

    let firstnameUser = dataResult.infos.firstname
    let letterFirstnameUser
    if (firstnameUser !== undefined) {
        letterFirstnameUser = firstnameUser.charAt(0).toUpperCase()
    }

    const [upLike, noneLike] = useState()
    const likeSystem = async (e) => {
        // let inputLike = document.querySelector('#likeInput')
        // inputLike.value = parseInt(inputLike.value) + 1
        // let iconLikeOn = document.querySelector('#iconLikeOn')
        // iconLikeOn.classList.add('iconLikeOn')

        let idUrl = e

        try {
            const response = await fetch(
                'http://localhost:4200/api/ficheUser/post/one/' + idUrl,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authContext.token}`,
                    },
                }
            )
            const dataResponse = await response.json()
            let userId = dataResponse.usersLiked.find(
                (id) => id === dataResult.infos._id
            )

            if (response.ok && !userId) {
                try {
                    const response = await fetch(
                        'http://localhost:4200/api/ficheUser/post/like/' +
                            idUrl,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authContext.token}`,
                            },
                            body: JSON.stringify({
                                userId: authContext.userId,
                                likes: 1,
                            }),
                        }
                    )
                    const dataResponse = await response.json()
                    //     if (response.ok) {
                    //         fetch(urlGet, {
                    //             method: 'GET',
                    //             headers: {
                    //                 'Content-Type': 'application/json',
                    //                 Authorization: `Bearer ${authContext.token}`,
                    //             },
                    //         })
                    //             .then((resp) => resp.json())
                    //             .then((data) => setDataResultPosts([...data]))
                    //     }
                } catch (err) {
                    console.log(err)
                }
            } else if (response.ok && userId) {
                try {
                    const response = await fetch(
                        'http://localhost:4200/api/ficheUser/post/like/' +
                            idUrl,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authContext.token}`,
                            },
                            body: JSON.stringify({
                                userId: authContext.userId,
                                likes: 0,
                            }),
                        }
                    )
                    const dataResponse = await response.json()
                    // if (response.ok) {
                    //     fetch(urlGet, {
                    //         method: 'GET',
                    //         headers: {
                    //             'Content-Type': 'application/json',
                    //             Authorization: `Bearer ${authContext.token}`,
                    //         },
                    //     })
                    //         .then((resp) => resp.json())
                    //         .then((data) => setDataResultPosts([...data]))
                    // }
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    const onModifyPost = (e) => {
        setpostIdForModify(e.target.id)
        togglePostModalModify('postModalModify')
    }

    const onDeletePost = (e) => {
        setpostIdForDelete(e.target.id)
        togglePostModalDelete('postModalDelete')
    }

    const Tabs = ({ children }) => {
        const childrenArray = React.Children.toArray(children)
        const [current, setCurrent] = useState()
        const newChildren = childrenArray.map((child) => {
            return React.cloneElement(child, {
                selected: child.key === current,
            })
        })
        document.addEventListener('click', (e) => {
            for (let element of childrenArray) {
                if (e.target.id !== element.props.id) {
                    setCurrent(false)
                }
            }
        })

        return (
            <>
                {childrenArray.map((child, index) => (
                    <div key={`${child.props.id}-${index}`} id={child.props.id}>
                        <button
                            id={child.props.id}
                            className={'blockIconOptions'}
                            onClick={() => setCurrent(child.key)}
                        >
                            <FontAwesomeIcon
                                id={child.props.id}
                                icon={faEllipsis}
                                fontSize="36px"
                            />
                        </button>
                        <div id={child.props.id}>{newChildren}</div>
                    </div>
                ))}
            </>
        )
    }

    const Tab = ({ children, selected }) => {
        return <div hidden={!selected}>{children}</div>
    }

    const ButtonsLikeUp = ({ children }) => {
        const childrenArray = React.Children.toArray(children)
        const [currentLike, setCurrentLike] = useState()
        const [numberLike, setNumberLike] = useState(0)
        const [numberLikeSub, setNumberLikeSub] = useState(0)
        const newChildren = childrenArray.map((child) => {
            return React.cloneElement(child, {
                clicked: child.key === currentLike,
            })
        })

        useEffect(() => {
            dataResultPosts.forEach((post) => {
                for (let id of post.usersLiked) {
                    if (
                        id === dataResult.infos._id &&
                        post._id === children.key
                    ) {
                        setCurrentLike(children.key)
                    }
                }
            })
        }, [])

        const clickLike = (key) => {
            let id = key.split('.$')[1]

            likeSystem(id)

            const post = dataResultPosts.find((object) => object._id === id)

            const userLike = post.usersLiked.find(
                (id) => id === dataResult.infos._id
            )
            if (currentLike && numberLike === 1) {
                setCurrentLike(false)
                setNumberLike(0)
            } else if (!currentLike && numberLike === 0) {
                setCurrentLike(key)
                setNumberLike(1)
            } else if (currentLike && numberLike === 0) {
                setCurrentLike(false)
                setNumberLike(-1)
            } else if (!currentLike && numberLike === -1) {
                setCurrentLike(key)
                setNumberLike(0)
            }
        }

        return childrenArray.map((child) => (
            <div
                key={child.key}
                style={{
                    width: '100%',
                    height: '90%',
                    display: 'flex',
                    fontSize: '24px',
                    color: `${colors.tertiary}`,
                }}
            >
                <div style={{ display: 'flex', marginTop: '6px' }}>
                    {currentLike ? (
                        <button
                            id={child.props.id}
                            className="buttonLike"
                            onClick={() => clickLike(child.key)}
                        >
                            <FontAwesomeIcon
                                id={child.props.id}
                                icon={fasThumbsUp}
                            />
                        </button>
                    ) : (
                        <button
                            id={child.props.id}
                            className="buttonLike"
                            onClick={() => clickLike(child.key)}
                        >
                            <FontAwesomeIcon
                                id={child.props.id}
                                icon={farThumbsUp}
                            />
                        </button>
                    )}
                    <p style={{ marginTop: '0', marginLeft: '16px' }}>
                        {child.props.likes + numberLike - numberLikeSub}
                    </p>
                </div>
                <div id={child.props.id}>{newChildren}</div>
            </div>
        ))
    }

    const ButtonLikeUp = ({ children, clicked }) => {
        return <div hidden={!clicked} id={children.id}></div>
    }

    const GetPost = () => {
        return dataResultPosts.map((posts, index) => (
            <div className="allPostsAndModals" key={posts._id}>
                <div className="blockAuthor">
                    <div className="divAuthor">
                        <div className="pictureUserPost">
                            {posts.imageUrlPostProfil ? (
                                <img
                                    src={posts.imageUrlPostProfil}
                                    className="imageUser"
                                ></img>
                            ) : null}
                        </div>
                        <div className="nameAuthor">
                            {posts.firstname} {posts.lastname}
                        </div>
                        {dataResult.infos._id === posts.userId ||
                        dataResult.infos.isAdmin === true ? (
                            <div className="divIconOptions" id={posts._id}>
                                <Tabs>
                                    <Tab id={posts._id} key={posts._id}>
                                        <div>
                                            <ContenairOptionsPosts
                                                id={posts._id}
                                            >
                                                <ContenairOptionsPostsArrow
                                                    id={posts._id}
                                                ></ContenairOptionsPostsArrow>
                                                <BlockButtonChangePost
                                                    id={posts._id}
                                                >
                                                    <ButtonOptionsChangePost
                                                        id={posts._id}
                                                        onClick={onModifyPost}
                                                    >
                                                        <p
                                                            id={posts._id}
                                                            className={
                                                                posts._id
                                                            }
                                                            style={{
                                                                marginTop:
                                                                    '6px',
                                                            }}
                                                        >
                                                            Modifier
                                                        </p>
                                                    </ButtonOptionsChangePost>
                                                    <ButtonOptionsChangePost
                                                        id={posts._id}
                                                        onClick={onDeletePost}
                                                    >
                                                        <p
                                                            id={posts._id}
                                                            style={{
                                                                marginTop:
                                                                    '6px',
                                                            }}
                                                        >
                                                            Supprimer
                                                        </p>
                                                    </ButtonOptionsChangePost>
                                                </BlockButtonChangePost>
                                            </ContenairOptionsPosts>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="blockContentPost">
                    <div className="paragraphContentPost">
                        {posts.postContent} {posts.id}
                    </div>
                </div>
                {posts.imageUrlPostPicture ? (
                    <>
                        <div className="separator"></div>
                        <div className="blockImagePost">
                            <img
                                className="imagePost"
                                src={posts.imageUrlPostPicture || ' '}
                                alt="photo profil utilisateur"
                            ></img>
                        </div>
                    </>
                ) : null}
                <div className="separator"></div>
                <div className="ContenairOptions">
                    <div className="iconLikeOn">
                        <ButtonsLikeUp>
                            <ButtonLikeUp
                                key={posts._id}
                                id={posts._id}
                                likes={posts.likes}
                            >
                                <div>{posts.likes}</div>
                            </ButtonLikeUp>
                        </ButtonsLikeUp>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <>
            <ContenairMenuModals>
                <Post>
                    <DivInput>
                        <PictureUserPostWrite>
                            {dataResult.infos.imageUrlProfilePicture ? (
                                <Image
                                    src={
                                        dataResult.infos.imageUrlProfilePicture
                                    }
                                    alt="photo profil utilisateur"
                                ></Image>
                            ) : (
                                <DivFontLetterUser>
                                    <p
                                        style={{
                                            fontSize: '24px',
                                            color: `${colors.secondary}`,
                                            position: 'relative',
                                            top: '10px',
                                            right: '1px',
                                        }}
                                    >
                                        {letterFirstnameUser}
                                    </p>
                                </DivFontLetterUser>
                            )}
                        </PictureUserPostWrite>
                        <InputPost onClick={() => togglePostModal('postModal')}>
                            <ParagraphPost>
                                Ecrivez quelque chose...
                            </ParagraphPost>
                        </InputPost>
                    </DivInput>
                    <Separator />
                    <DivIconPicture>
                        <div>
                            <BlockOptionPicture onClick={clickInput}>
                                <ParagraphIcon>
                                    <FontAwesomeIcon
                                        icon={faPhotoFilm}
                                        fontSize="30px"
                                    />
                                    <ParagraphNameIcon>Image</ParagraphNameIcon>
                                    <InputPicture
                                        onChange={pictureLandscape}
                                    ></InputPicture>
                                </ParagraphIcon>
                            </BlockOptionPicture>
                        </div>
                    </DivIconPicture>
                </Post>
                <ContenairAllPosts>
                    <GetPost infosPosts={dataResultPosts} />
                </ContenairAllPosts>
                <EndPosts></EndPosts>
            </ContenairMenuModals>
            <PostModal
                displayImg={displayImg}
                filePost={filePost}
                dataResultPosts={dataResultPosts}
                pictureLandscape={pictureLandscape}
            />
            <PostModalModify postIdForModify={postIdForModify} />
            <PostModalDelete
                postIdForDelete={postIdForDelete}
                dataResult={dataResult}
            />
        </>
    )
}

export default Actuality
