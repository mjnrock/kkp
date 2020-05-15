import React from "react";
import { useParams } from "react-router-dom";

import Image from "../components/image/package";

export default function Album() {
    let { albumId } = useParams();

    return (
        <>
            <Image.Album albumId={ albumId } />
        </>
    );
}