import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { ValidationContextProvider } from './context/validationContext'
import { UserContextProvider } from './context/userContext'
import { AsideProfilContextProvider } from './context/asideProfilContext'
import { PostContextProvider } from './context/postContext'
import { ConnectedHomeContextProvider } from './context/ConnectedHomeContext'
import { PostModifyContextProvider } from './context/postModifyModalContext'
import { PostDeleteContextProvider } from './context/postDeleteModalContext'
import Cursor from './components/Cursor'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <UserContextProvider>
            <ValidationContextProvider>
                <AuthContextProvider>
                    <ConnectedHomeContextProvider>
                        <PostContextProvider>
                            <PostModifyContextProvider>
                                <PostDeleteContextProvider>
                                    <AsideProfilContextProvider>
                                        <App />
                                    </AsideProfilContextProvider>
                                </PostDeleteContextProvider>
                            </PostModifyContextProvider>
                        </PostContextProvider>
                    </ConnectedHomeContextProvider>
                </AuthContextProvider>
            </ValidationContextProvider>
        </UserContextProvider>
        <Cursor />
    </BrowserRouter>
)
