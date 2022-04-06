import * as THREE from '../libs/three.module.js'
import {Esfera} from './Esfera.js'

class Aguja extends THREE.Object3D {
    constructor(gui) {
      super();

      this.createGUI(gui);
  
      this.angulo = 2*Math.PI;
      this.aguja = this.createAguja();
      this.add(this.aguja);
    }

    createGUI(gui){
        this.guiControls = new function () {
            this.factor = 0.01;
        }

        gui.add(this.guiControls, 'factor',-0.5,0.5,0.01).name('Velocidad: ').listen();
    }
  
    createAguja(){
        var rojo = new THREE.MeshPhongMaterial({color : 0xff0000});

        var x = Math.sin(this.angulo)*Math.sin(1.5)*4;
        var y = 0;
        var z = Math.cos(this.angulo)*4-0.5;
        this.aguja = new Esfera(0.2,rojo,20,x,y,z);
        
        return this.aguja;
    }
    
    update () {
        this.aguja.rotation.y -= this.guiControls.factor;
    }
}

export {Aguja};