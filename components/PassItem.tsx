import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react';

const PassItem = ({ progress, ...props }: any) => {
    const data = props;
    var rarity = null;
    var triangle = null;
    if (data.props.rarity === "legendary") {
        rarity = "bg-yellow-600 border-yellow-400"
    }
    else if (data.props.rarity === "epic") {
        rarity = "bg-fuchsia-400 border-purple-500"
    }
    else if (data.props.rarity === "rare") {
        rarity = "bg-blue-600 border-blue-400"
    }
    else if (data.props.rarity === "uncommon") {
        rarity = "bg-lime-500 border-lime-200"
    }
    else {
        rarity = "bg-gray-400 border-gray-300"
    }
    return (
        <div className='col-span-1 p-4 bg-black/25'>
            <div className={rarity + ' border-4 p-4 relative flex-none w-full h-full'}>
                <Image className="object-cover relative rounded" src={data.props.src} alt="image" fill />
            </div>
        </div>
    )
}

export default PassItem