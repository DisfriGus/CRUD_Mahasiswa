import React, { useEffect, useState } from 'react'

const Table = ({nama,npm, jurusan, email, absensi, nilai, grade, mataKuliah}) => {
    return (
        
            <tr className="h-18 border-b border-coolGray-100">
                <th className="whitespace-nowrap px-4 bg-white text-left">
                    <div className="flex items-center -m-2">
                        <div className="w-auto p-2">
                            <input className="w-4 h-4 bg-white rounded" type="checkbox" />
                        </div>
                        <div className="w-auto p-2">
                            <p className="text-xs font-semibold text-coolGray-800">{nama}</p>
                            <p className="text-xs font-medium text-coolGray-500">{npm}</p>
                        </div>
                    </div>
                </th>
                <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-800 text-left">{jurusan}</th>
                <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-800 text-center">{email}</th>
                <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-coolGray-500 text-left">{absensi}</th>
                <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-#col#-500 text-left">{nilai}</th>
                <th className="whitespace-nowrap px-4 bg-white text-sm font-medium text-#col#-500 text-left">{grade}</th>
                <th className="whitespace-nowrap px-4 bg-white text-left">
                    <div className="w-auto p-2">
                        <p className="text-xs font-semibold text-coolGray-800">{mataKuliah}</p>
                    </div>
                </th>
                <th className="whitespace-nowrap pr-4 bg-white text-sm font-medium text-coolGray-800">
                </th>
            </tr>

        
    )
}

export default Table