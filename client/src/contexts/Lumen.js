import React from "react";
import Lux from "@lespantsfancy/lux";

const Lumen = new Lux.Core.ClassDecorators.StateEvents();

//* Testing variables
Lumen.prop("Test", 1);
Lumen.prop("Bobs", {
    Cat: 5
});

const LuxContext = React.createContext(Lumen);

export default LuxContext;