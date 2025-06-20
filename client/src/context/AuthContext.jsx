import { useEffect, useRef, useState } from 'react';
import {
    CivicAuthProvider,
    UserButton,
    useToken
} from "@civic/auth/react";

import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../features/auth.slice.js';

function AuthContext({ children }) {

    const iframeContainerRef = useRef(null);
    const tokenInfo = useToken();
    const dispatch = useDispatch();

    const auth = useSelector(info => info.authReducer.auth)

    useEffect(() => {
        console.log(tokenInfo);
        // dispatch(setAuth(tokenInfo));
    }, [dispatch, tokenInfo])

    useEffect(() => {
        console.log(auth)
    }, [auth])

    return (
        <>
            <div ref={iframeContainerRef} id="civic-iframe-container" />

            <CivicAuthProvider
                clientId="437291ef-bb31-488c-a0ec-5bd511ff8cf6"
                displayMode="iframe"
                iframeDisplayMode="modal"
                targetContainerElement={iframeContainerRef}
            >
                <UserButton />
                {
                    auth && children
                }
            </CivicAuthProvider>
        </>
    );
}

export default AuthContext;