"use client";

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";


// todo: useState hooks from this component to parent component, signify page state, and change button colors accordingly (or use a different component for each page)

export default function Taskbar(props: any) {
    const buttons = props.buttons;
    
    return(
        <section id={"taskbar"} className={"taskbar"}>
            <div id={"taskbar-logo"} className={"taskbar-logo"}>
            <MouseParallaxContainer globalFactorX={0.02} globalFactorY={0.01} useWindowMouseEvents resetOnLeave className={"overflow-visible"}>
                        <MouseParallaxChild>
                        <svg viewBox="0 0 185 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={"m-auto absolute"}>
                            <rect y="10" width="173" height="79" fill="#A04732" fillOpacity="0.5"/>
                        </svg>
                        </MouseParallaxChild>
                        <MouseParallaxChild>
                        <svg viewBox="0 0 185 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={"m-auto absolute"}>
                            <rect x="12" y="21" width="173" height="79" fill="#A04732" fillOpacity="0.5"/>
                        </svg>
                        </MouseParallaxChild>
                        <MouseParallaxChild>
                        <svg viewBox="0 0 185 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={"m-auto relative"}>
                            <path d="M40.8347 45.864H43.3547C47.7227 45.864 49.9067 48 49.9067 52.272V81H43.4267V53.208C43.4267 52.344 43.2827 51.792 42.9947 51.552C42.7067 51.264 42.1307 51.12 41.2667 51.12H38.7467C37.8827 51.12 37.2587 51.312 36.8747 51.696C36.5387 52.08 36.3707 52.728 36.3707 53.64V81H29.8907V45.864H36.3707V48.672C36.9947 46.8 38.4827 45.864 40.8347 45.864ZM62.4515 45.864H70.1555C74.6195 45.864 76.8515 48 76.8515 52.272V74.664C76.8515 78.888 74.6195 81 70.1555 81H62.4515C58.0355 81 55.8275 78.888 55.8275 74.664V52.272C55.8275 48 58.0355 45.864 62.4515 45.864ZM70.4435 73.728V53.136C70.4435 52.272 70.2995 51.696 70.0115 51.408C69.7235 51.12 69.1475 50.976 68.2835 50.976H64.3235C63.4595 50.976 62.8835 51.12 62.5955 51.408C62.3555 51.696 62.2355 52.272 62.2355 53.136V73.728C62.2355 74.592 62.3555 75.168 62.5955 75.456C62.8835 75.744 63.4595 75.888 64.3235 75.888H68.2835C69.1475 75.888 69.7235 75.744 70.0115 75.456C70.2995 75.168 70.4435 74.592 70.4435 73.728ZM89.388 45.864H96.444C100.956 45.864 103.212 48 103.212 52.272V65.448H89.028V73.8C89.028 74.616 89.172 75.168 89.46 75.456C89.748 75.744 90.324 75.888 91.188 75.888H94.5C95.364 75.888 95.94 75.744 96.228 75.456C96.516 75.168 96.66 74.592 96.66 73.728V70.848H102.996V74.664C102.996 78.888 100.764 81 96.3 81H89.388C84.924 81 82.692 78.888 82.692 74.664V52.272C82.692 48 84.924 45.864 89.388 45.864ZM89.028 60.696H96.804V53.064C96.804 52.248 96.66 51.696 96.372 51.408C96.132 51.12 95.58 50.976 94.716 50.976H91.188C90.324 50.976 89.748 51.12 89.46 51.408C89.172 51.696 89.028 52.248 89.028 53.064V60.696ZM115.261 81H108.781V32.832H115.261V81ZM121.866 62.352V57.312H137.562V62.352H121.866ZM156.457 45.792H157.897V51.408H155.305C152.281 51.408 150.769 53.184 150.769 56.736V81H144.289V45.864H150.769V50.184C151.153 48.936 151.825 47.904 152.785 47.088C153.793 46.224 155.017 45.792 156.457 45.792Z" fill="#EDEAE2"/>
                        </svg>
                        </MouseParallaxChild>
                </MouseParallaxContainer>
            </div>
            <div id={"taskbar-navigation"} className={"taskbar-container"}>
                {props.children}
            </div>
        </section>
    )
}