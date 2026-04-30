import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (pathname === '/' && hash === '#about') {
            const el = document.querySelector('#about');
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        }
    }, [pathname, hash]);

    return null;
}