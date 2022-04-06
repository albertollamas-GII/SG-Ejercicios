import * as THREE from '../libs/three.module.js'
import {Esfera} from './Esfera.js'

class Reloj extends THREE.Object3D{

    constructor(){
        super();

        this.reloj = this.createReloj();

        this.add(this.reloj);
    }

    createReloj(){

        var verde = new THREE.MeshPhongMaterial({color : 0x00ff00});
        this.reloj = new THREE.Object3D();

        for (var angulo = 2*Math.PI;angulo>0.15;angulo-=2*Math.PI/12){
            var x = Math.sin(angulo)*Math.sin(1.5)*4;
            var y = 0;
            var z = Math.cos(angulo)*4;
            var esfera = new Esfera(0.2,verde,20,x,y,z);
            this.reloj.add(esfera);
        }
        
        return this.reloj;

    }

}

export {Reloj};