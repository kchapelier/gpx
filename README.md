gpx
===

Javascript (CommonJS) library to generate GPX 1.1 files (STALLED).

This library was a work in progress for a project which ended up going another direction.
It 'works' but is not properly battle-tested or documented, hence why this library is not published on NPM.

Exemple :

Using the high level GpxFileBuilder API

```js
//retrieve the GpxFileBuilder type
var GpxFileBuilder = require('gpx').GpxFileBuilder;

//instanciate a GpxFileBuilder
var builder = new GpxFileBuilder();

//generate a gpx string with two waypoints and a route with two points
var xml = builder.setFileInfo({
    name : 'Test file',
    description : 'A test file generated in javascript',
    creator : 'My Application',
    time : new Date(),
    keywords : ['test', 'javascript']
}).addWayPoints([
    {
        latitude : 50.04243,
        longitude : 4.98264,
        name : 'Waypoint #1',
        elevation : 1.243
    },
    {
        latitude : 50.02394,
        longitude : 4.97745,
        name : 'Waypoint #2',
        elevation : 1.222
    }
]).addRoute(
    {
        name : 'Test route'
    },
    [
        {
            latitude : 50.04243,
            longitude : 4.98264
        },
        {
            latitude : 50.03561,
            longitude : 4.98109
        },
        {
            latitude : 50.02394,
            longitude : 4.97745
        },
    ]
).xml();
```
