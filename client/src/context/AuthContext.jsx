import { useEffect, useRef } from 'react';
import {
    CivicAuthProvider,
    UserButton,
    useToken
} from "@civic/auth/react";

function AuthContext({ children }) {

    const iframeContainerRef = useRef(null);
    const tokenInfo = useToken();

    useEffect(() => {
        console.log(tokenInfo);

    }, [tokenInfo])

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
                {children}
            </CivicAuthProvider>
        </>
    );
}

export default AuthContext;