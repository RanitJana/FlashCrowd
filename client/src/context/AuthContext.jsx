import { useEffect, useRef } from 'react';
import {
    CivicAuthProvider,
    SignInButton,
    useUser
} from "@civic/auth/react";

import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../features/auth.slice.js';
import { handleLogin } from '../api/auth.js';

function AuthContext({ children }) {

    const auth = useSelector(info => info.authReducer.auth)

    const iframeContainerRef = useRef(null);
    const dispatch = useDispatch();
    const { user } = useUser();


    useEffect(() => {
        (async () => {
            if (!user) return;
            const response = await handleLogin(user);
            if (response?.data.user) {
                dispatch(setAuth(response.data.user));
            }
            else {
                console.error("Login failed:", response?.error || "Unknown error");
            }

        })()
    }, [dispatch, user])


    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                {/* Civic iframe container (unchanged functionality) */}
                <div
                    ref={iframeContainerRef}
                    id="civic-iframe-container"
                    className="fixed inset-0 z-50 hidden"
                />

                <CivicAuthProvider
                    clientId={import.meta.env.VITE_CIVIC_CLIENT_ID}
                    displayMode="iframe"
                    iframeDisplayMode="modal"
                    targetContainerElement={iframeContainerRef}
                >
                    {
                        auth ? children : <SignInButton className="fixed top-4 right-4 z-50" />

                    }
                </CivicAuthProvider>
            </div>
        </>
    );
}

export default AuthContext;