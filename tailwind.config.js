// tailwind.config.js
module.exports = {
    purge: {
        content: ['./src/**/*.html'],

        // These options are passed through directly to PurgeCSS
        options: {
            safelist: [
                // Position
                'absolute', 'self-center', 'justify-center',
                // Display
                'flex', 'hidden', 'flex-grow', 'flex-col', 'block',
                // Margin, Padding, Size
                'h-screen', 'h-14', 'h-10', 'h-3.5',
                'z-1000', 
                'top-3',
                'w-full' ,'w-96', 'w-80', 'w-32', 'w-10', 'w-7', 'w-4', 'w-4/5', 'w-1/2', 'w-1/3','w-1/4',
                'my-0', 'mx-2', 'mx-auto', 'mt-8', 'mt-3', 'mb-8', 'mb-5', 'ml-0.5',
                'px-2.5', 'py-0.5', 'p-2.5', 'p-2','p-1',
                'rounded', 'rounded-3xl', 'rounded-lg',
                'text-5xl', 'text-3xl', 'font-bold', 'text-left',
                // Cursor, Font
                'cursor-pointer',
                // Background, Box, Color
                'bg-white', 'bg-black', 'bg-gray-300', 'bg-gray-100', 'bg-red-600',
                'border-b', 'border', 'border-white',
                'text-white',
                'hover:text-gray-600', 'hover:bg-gray-200', 'hover:bg-gray-100', 'hover:opacity-70', 'hover:fill-current',
                'focus:outline-none', 'focus:border-red-500',
                // Transition
                'transition',
                'duration-500'
            ],
            blocklist: [/^debug-/],
            keyframes: true,
            fontFace: true,
        },
    },
    theme: {
        zIndex: {
            1000: 1000,
            'auto': 'auto'
        }
    },
    variants: {
        fill: ['hover', 'focus']
    }
}