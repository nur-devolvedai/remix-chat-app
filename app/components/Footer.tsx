"use client"

import { Link } from '@remix-run/react';
import React, { useState } from 'react';


const Footer = () => {
    const year = new Date().getFullYear();
    const [currentYear] = useState(year);
    // COPYRIGHT © 2023 Devolved AI - ALL RIGHTS RESERVED
    return (
        <section className="bg-[#F9F9F9] h-10 flex items-center justify-center fixed bottom-0 left-0 w-full">
            <p className="text-[#6A6A6A] text-[0.8125rem]">
                Copyright @ {currentYear},{" "}
                <Link to={"https://devolvedai.com/"} target="_blank" className="underline capitalize">
                    Devolved AI - All Rights Reserved
                </Link>
            </p>
        </section>
    );
};

export default Footer;
