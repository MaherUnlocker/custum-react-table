import React from 'react'
export function IsMobileView(): boolean {
    // eslint-disable-next-line
    const [width, setWidth] = React.useState<number>(window.innerWidth);
    const breakpoint = 767;
    React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width of page
    return width < breakpoint ? true : false;
}
