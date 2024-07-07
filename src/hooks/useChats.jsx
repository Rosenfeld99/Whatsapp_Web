import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';

const useChats = () => {

    const { dispatch, data } = useContext(ChatContext);

    

    return {
        dispatch, data
    }
}

export default useChats