import React from 'react'
import styled from 'styled-components'
import colors from '../style/Colors'

const ContenairMenuModals = styled.div`
    width: 72%;
    height: 100%;
    margin-bottom: 20px;
    margin-left: 27%;
    margin-top: 18%;
    text-align: center;
    color: ${colors.secondary};
    @media screen and (max-width: 961px) {
        width: 100%;
        margin-left: 0%;
        opacity: 0;
        animation-name: displayModalsMenu;
        animation-delay: 120ms;
        animation-duration: 300ms;
        animation-fill-mode: forwards;
    }
`

const Message = styled.div`
  
  @media screen and (max-width: 961px) {
    position: relative;
    top: 140px;
    }
`

export default function ModalPageMessages() {
  return (
    <ContenairMenuModals>
      <Message>
        <h1>Cette fonctionnalité arrive bientôt</h1>
      </Message>
    </ContenairMenuModals>
  )
}
