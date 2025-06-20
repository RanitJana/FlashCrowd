import React from 'react'
import { SignOutButton } from '@civic/auth/react'

function Header() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Auth header */}
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    FlashCrowd
                </h1>
                {<SignOutButton />}
            </div>

        </div>
    )
}

export default Header