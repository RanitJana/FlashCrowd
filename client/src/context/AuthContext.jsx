import { useEffect, useRef, useState } from 'react';
import {
    CivicAuthProvider,
    SignInButton,
    useUser
} from "@civic/auth/react";

import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../features/auth.slice.js';
import { handleLogin } from '../api/auth.js';

function AuthContext({ children }) {
    const auth = useSelector(info => info.authReducer.auth);
    const dispatch = useDispatch();
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const iframeContainerRef = useRef(null);
    const signInButtonRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                // Set loading true only once
                if (user) {
                    const response = await handleLogin(user);

                    if (response?.data.user) {
                        dispatch(setAuth(response.data.user));
                    } else {
                        console.error("Login failed:", response?.error || "Unknown error");
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [dispatch, user]);


    // 🧠 Auto-click SignInButton after mount if not authenticated
    useEffect(() => {
        if (signInButtonRef.current) {
            const timeout = setTimeout(() => {
                signInButtonRef.current.click();
            }, 2000); // slight delay ensures DOM is ready
            return () => clearTimeout(timeout);
        }
    }, [signInButtonRef]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
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
                    !isLoading
                        ? auth ? children : <ShowLogin signInButtonRef={signInButtonRef} />
                        : <div className='flex items-center justify-center h-screen w-full'><div class="loader"></div></div >
                }
            </CivicAuthProvider >
        </div >
    );
}

function ShowLogin({ signInButtonRef }) {
    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <div className='flex flex-col items-center gap-4'>
                <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        FlashCrowd
                    </h1>
                </div>
                <SignInButton
                    ref={signInButtonRef}
                    className="hover:cursor-pointer hover:brightness-200 transition-all"
                />
            </div>
        </div>
    )
}

export default AuthContext;
