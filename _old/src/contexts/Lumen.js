import React from "react";
import Lux from "@lespantsfancy/lux";

//TODO Refactor this file to be a (defaultValues) => React.createContext(defaultValues) situation, that still uses @Lux
// In effect, allow the definition of initial state

const Lumen = new Lux.Core.ClassDecorators.StateEvents();

//* Testing variables
Lumen.prop("Test", 1);
Lumen.prop("Bobs", {
    Cat: 5
});

const LuxContext = React.createContext(Lumen);

export default LuxContext;