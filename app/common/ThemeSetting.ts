export const theme = {
    list: {
        defaultProps: {
            ripple: false,
            className: "",
        },
        styles: {
            base: {
                item: {
                    initial: {
                        bg: "hover:bg-teal-100/25",
                        color: "hover:text-blue-gray-900 focus:text-blue-gray-900",
                        outline: "outline-none",
                    },
                    selected: {
                        bg: "bg-teal-100/50",
                        color: "text-blue-gray-800",
                        fontWeight: "font-semibold"
                    },
                },
            },
        },
    },
};