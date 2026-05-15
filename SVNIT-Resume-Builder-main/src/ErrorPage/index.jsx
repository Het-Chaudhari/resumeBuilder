import Header from '@/components/custom/Header'
import React from 'react'

export default function ErrorPage() {
    return (
        <div>
            <Header />
            <div className="mt-10 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="mb-6">The page you’re looking for doesn’t exist.</p>
            </div>
        </div>
    )
}