import React from 'react'

type Button = {
    name: string,
}

const Button = (props:Button) => {
    return (
        <button
            type="submit"
            className="transition flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {props.name}
        </button>
    )
}

export default Button