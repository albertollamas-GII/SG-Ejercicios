import * as THREE from '../libs/three.module.js'
import {Esfera} from './Esfera.js'

class Aguja extends THREE.Object3D {
    constructor(gui) {
      super();

      this.createGUI(gui);
      this.reloj = new THREE.Clock();
      this.velocidad = 1;
      this.angulo = 2*Math.PI;
      this.aguja = this.createAguja();
      this.add(this.aguja);
    }

    createGUI(gui){
        this.guiControls = new function () {
            this.velocidad = 1;
        }

        gui.add(this.guiControls, 'velocidad', -5, 5, 1).name('Velocidad: ').onChange((value) => this.cambiarVelocidad(value));;
    }
  
    createAguja(){
        var rojo = new THREE.MeshPhongMaterial({color : 0xff0000});

        var x = Math.sin(this.angulo)*Math.sin(1.5)*4;
        var y = 0;
        var z = Math.cos(this.angulo)*4-0.5;
        this.a = new Esfera(0.2,rojo,20,x,y,z);
        
        return this.a;
    }
    
    cambiarVelocidad (value) {
        this.velocidad = value * Math.PI /6
    }

    update(){
        var segundosTranscurridos = this.reloj.getDelta();
        this.aguja.rotation.y -= this.velocidad * segundosTranscurridos;
    }
}

export {Aguja};