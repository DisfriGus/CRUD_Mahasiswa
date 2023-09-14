import React from 'react'

const Summary = ({ nilai, features, style }) => {

    return (
        <div className={`w-full p-2 ${style}`}>
            <div className="h-full p-10 text-center border border-coolGray-100 rounded-md shadow-dashboard">
                <h2 className="font-medium text-5xl text-coolGray-900 tracking-tighter">{nilai}</h2>
                <p className="font-medium text-sm text-coolGray-500">{features}</p>
            </div>
        </div>
    )
}

export default Summary