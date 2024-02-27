import clsx from "clsx"

export interface ButtonProps {
    disabled?: boolean,
    children: React.ReactNode
}

export default function Button({disabled, children, ...rest}: ButtonProps) {
    return(
        <button
            className={'mt-5 w-1/3 py-2.5 px-5 bg-gray-900 text-zinc-50 text-base text-center font-medium rounded hover:bg-white hover:text-gray-900 hover:border hover:border-black'}
        >{children}</button>
    )
}