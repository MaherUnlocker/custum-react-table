import React from 'react'

export function IsMobileView(): boolean {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 767;
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width of page
    return width < breakpoint ? true : false;
}
