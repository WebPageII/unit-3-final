var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {

///////////////////// game obdjcts ///////////////////////

// Sceen object
var scene = new BABYLON.Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

// Make plyer!!
var player = BABYLON.SceneLoader.ImportMesh(null, "./", "player.glb", scene, function (meshes, particleSystems, skeletons) {
    
    var scalee = 0.02;

    meshes[0].scaling.x = scalee;
    meshes[0].scaling.y = scalee;
    meshes[0].scaling.z = scalee;

});

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Our built-in 'ground' shape.
var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

return scene;
};
window.initFunction = async function() {

var asyncEngineCreation = async function() {
    try {
    return createDefaultEngine();
    } catch(e) {
    console.log("the available createEngine function failed. Creating the default engine instead");
    return createDefaultEngine();
    }
}

window.engine = await asyncEngineCreation();

if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
