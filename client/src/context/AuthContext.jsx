import { useEffect, useRef } from 'react';
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
        dispatch(setAuth(tokenInfo));
    }, [dispatch, tokenInfo])

    useEffect(() => {
        console.log(auth)
    }, [auth])

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
                            MyApp
                        </h1>
                        <UserButton className="relative inline-flex items-center px-6 py-3 bg-black border border-indigo-400/50 rounded-mdtext-sm font-mono font-medium text-indigo-300 hover:text-indigo-100 transition-all duration-150 shadow-[0_0_8px_2px_rgba(99,102,241,0.3)]hover:shadow-[0_0_12px_4px_rgba(99,102,241,0.4)]before:absolute before:inset-0 before:border-t before:border-indigo-400/30 before:animate-pulse">
                    <span className="text-indigo-400 mr-2">⏣</span>
                      VERIFY_ID
                    </UserButton>
                    </div>

                    {/* Main content area with glass panel effect */}
                    <main className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
                        {children}
                    </main>

                    {/* Status indicator (uses your tokenInfo) */}
                    <div className="mt-8 text-center text-sm text-white/60">
                        {tokenInfo ? "🔒 Securely authenticated" : "🟡 Authentication required"}
                    </div>
                </div>
            </CivicAuthProvider>
        </div>
        </>
    );
}

export default AuthContext;