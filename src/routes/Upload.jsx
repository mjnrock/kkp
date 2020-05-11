import React from "react";
import { useParams } from "react-router-dom";

import Account from "../components/account/package";

export default function UploadMedia() {
    return (
        <>
            <Account.UploadMedia />
        </>
    );
}