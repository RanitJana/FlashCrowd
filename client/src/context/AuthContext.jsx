import { useEffect, useRef } from 'react';
import {
    CivicAuthProvider,
    UserButton,
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
            dispatch(setAuth(user));
            console.log(user);
            const response = await handleLogin(user);
            console.log(response);

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
                    {/* Stunning glassmorphism UI wrapper */}
                    <div className="container mx-auto px-4 py-8">
                        {/* Auth header */}
                        <div className="flex justify-between items-center mb-12">
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                FlashCrowd
                            </h1>
                            <UserButton className="text-center relative inline-flex items-center px-6 py-3 bg-black border border-indigo-400/50 rounded-mdtext-sm font-mono font-medium text-indigo-300 hover:text-indigo-100 transition-all duration-150 shadow-[0_0_8px_2px_rgba(99,102,241,0.3)]hover:shadow-[0_0_12px_4px_rgba(99,102,241,0.4)]before:absolute before:inset-0 before:border-t before:border-indigo-400/30 before:animate-pulse">
                                <span className="text-indigo-400 mr-2">⏣</span>
                                VERIFY_ID
                            </UserButton>
                        </div>

                        {/* Main content area with glass panel effect */}
                        <main className="">
                            {auth && children}
                        </main>

                    </div>
                </CivicAuthProvider>
            </div>
        </>
    );
}

export default AuthContext;