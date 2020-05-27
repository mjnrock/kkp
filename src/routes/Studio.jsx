import React from "react";
import { useParams } from "react-router-dom";

import MediaStudio from "../components/studio/MediaStudio";

function ImageStudio(props) {
    const { uuid } = useParams();

    return (
        <MediaStudio uuid={ uuid } />
    );
}

export default ImageStudio;