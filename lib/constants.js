'use strict';

//TODO Clarify comment & reference source
//Extend object properties to enable enumeration
function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define("parseErrorMsg", "Could not decode request: JSON parsing failed");
define("notFoundErrorMsg", "Could not find URL: ");
define("routeNotFoundErrorMsg", "Route Not Found");