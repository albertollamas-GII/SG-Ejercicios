import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import {OBJLoader} from '../libs/OBJLoader.js'

class Modelo extends THREE.Object3D{
    constructor(){
        super();

        var that = this ;
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load('../models/porsche911/911.mtl',
            function(material){
                objectLoader.setMaterials(material);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                function(objeto){
                    var modelo = objeto ;
                    that.add(modelo);
                },
                // called when loading is in progresses
                function ( xhr ) {
            
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            
                },
                // called when loading has errors
                function ( error ) {
            
                    console.log( 'An error happened' );
            
                });
            });
            console.log(this);
    }

    update(){
       this.rotation.y += 0.01;
    }
}
export{Modelo};