export function Button({ variant = "primary", className = "", ...props }) {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
    };
    return (<button className={`${base} ${variants[variant]} ${className}`} {...props}/>);
}
//# sourceMappingURL=Button.jsx.map