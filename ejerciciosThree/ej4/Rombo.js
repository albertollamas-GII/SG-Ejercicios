import * as THREE from '../libs/three.module.js'
class Rombo extends THREE.Object3D {
    constructor() {
      super();
  
      this.pica = this.createRombo();
  
      this.add(this.pica);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
  
    createRombo(){
        var contorno = new THREE.Shape();

        contorno.lineTo(5,6); contorno.lineTo(0,12); contorno.lineTo(-5,6); contorno.lineTo(0,0);

        var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 5, steps: 5, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        
        geometry.translate(0,-5,0);
        

        this.mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0xff0000}) );


        this.cd = new THREE.Object3D();
        this.cd.position.x = -15;
        this.cd.position.y = 12;
        this.cd.add(this.mesh );

        this.e = new THREE.Object3D();
        this.e.add(this.cd);
      
        return (this.e);
    }

    
    update () {
        this.e.rotation.z += 0.01;
        this.cd.rotation.z -= 0.01;
        this.mesh.rotation.y += 0.01;
    }
  }
export {Rombo};