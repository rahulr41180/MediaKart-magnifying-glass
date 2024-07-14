
import { useState, useEffect, useRef } from "react";
import "../CSS/MagnifierComponent.css";

export const MagnifierComponent = () => {
    const [scale, setScale] = useState(1.2);
    const [size, setSize] = useState(150);
    const [LENSE_OFFSET_X, setLENSE_OFFSET_X] = useState(size / 10.2);
    const [LENSE_OFFSET_Y, setLENSE_OFFSET_Y] = useState(size / 10.2);
    const [display, setDisplay] = useState("none");
    const magnifyingglass = useRef(null);
    const handle = useRef(null);

    useEffect(() => {
        document.documentElement.style.setProperty("--scale", scale);
        document.documentElement.style.setProperty("--size", size + "px");
        magnifyingglass.current.style.top = LENSE_OFFSET_Y + "px";
        magnifyingglass.current.style.left = LENSE_OFFSET_X + "px";
    }, [])

    const addMagnifyingGlass = () => {
        setDisplay("block")
        const bodyClone = document.getElementById("wrapperDiv").cloneNode(true);
        bodyClone.classList.add("body-clone");
        bodyClone.style.top = "0px";
        bodyClone.style.left = "0px";
        magnifyingglass.current.append(bodyClone);
    };

    const moveMagnifyingGlass = (event) => {
        let pointerX = event.pageX;
        let pointerY = event.pageY;
        //move magnifying glass with cursor
        handle.current.style.left = pointerX - size / 1.7 + "px";
        handle.current.style.top = pointerY - size / 1.7 + "px";
        if (magnifyingglass.current.children[0]) {
            //align magnified document
            let offsetX = (size * Math.pow(scale, 7)) / 2 - pointerX * scale;
            let offsetY = (size * Math.pow(scale, 4.5)) / 2 - pointerY * scale;
            magnifyingglass.current.children[0].style.left = offsetX + "px";
            magnifyingglass.current.children[0].style.top = offsetY + "px";
        }
    };

    useEffect(() => {
        document.addEventListener("pointermove", moveMagnifyingGlass);
        return () => document.removeEventListener("pointermove", moveMagnifyingGlass);
    })

    const removeMagnifiyingGlass = (event) => {
        magnifyingglass.current.children[0].remove();
        setDisplay("none");
    };

    return (
        <>
            <div className="wrapper" id="wrapperDiv">
                <button onClick={addMagnifyingGlass} id="magnify">Magnifying Glass</button>
                <p className="wrapper_txt1">Click magnify to activate, double click to remove</p>
                <p className="wrapper_txt2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <img src="https://mail.google.com/mail/u/2?ui=2&ik=7251cb7922&attid=0.2&permmsgid=msg-f:1804185053382142806&th=1909c0bf3fe96b56&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ-K2ZSwwMzEViiFJXH0CbCjeE2DYSsWRSf9go2ovmcMstKIWA9eLiIkvUaROPQkdaL846xZ3AkyJkD5-dXyLI7KXwOaHhlEtRG23TT0hC1nywH8H-HXfT2FBB8&disp=emb&realattid=ii_lyfi9vhp2" alt="" className="wrapper_img1" />
                <p className="wrapper_txt3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius blandit tempor. Fusce tincidunt imperdiet mauris ut pretium. Aenean vehicula dignissim nisl, et vestibulum eros consequat nec. Mauris vulputate metus a ante lobortis mollis. Morbi posuere diam ligula, eget finibus dolor iaculis sed. Curabitur convallis dolor sit amet mi gravida, sed pellentesque nisl aliquet. Curabitur volutpat mauris ac nunc maximus, quis aliquam purus tempus.</p>
                <p className="wrapper_txt4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam augue, pretium vitae odio quis, convallis dapibus elit. Fusce hendrerit efficitur massa, quis molestie diam hendrerit eu. Aenean vel dictum.</p>
            </div>
            <div className="handle" ref={handle} style={{display : display}}>
                <div className="magnifying-glass" id="magnifying-glass-id" ref={magnifyingglass} onDoubleClick={removeMagnifiyingGlass}></div>
            </div>
        </>

    )
}