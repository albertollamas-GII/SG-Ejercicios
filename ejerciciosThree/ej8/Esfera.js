import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D{

    constructor(radio, material, segmentos, x, y, z){
        super();

        this.esfera = this.createEsfera(radio, material, segmentos,x,y,z);

        this.add(this.esfera);
    }

    createEsfera(radio, material, segmentos, x, y, z){

        var esferaGeom = new THREE.SphereGeometry(radio, segmentos, segmentos);
        esferaGeom.translate(x,y,z);
        var materialEsfera = material;

        var meshEsfera = new THREE.Mesh(esferaGeom, materialEsfera);

        var esfera = new THREE.Object3D();
        esfera.add(meshEsfera);
        return esfera;
    }

}

export {Esfera};