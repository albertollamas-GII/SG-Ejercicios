import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Medio extends THREE.Object3D{
    constructor() {
        super();
    
        this.medio = this.createMedio();
    
        this.add(this.medio);
        
      }
    
    
      createMedio(){
          var material = new THREE.MeshNormalMaterial();
          var box = new THREE.BoxGeometry(10,10,10);
          box.translate(20,0,0);
          var boxMesh = new THREE.Mesh(box,material);

          var boxErase = new THREE.CylinderGeometry(3,3,5,20,20);

          //Primero escalado, despues rotaciones y despues traslacion
          boxErase.scale(2,2,2);
          boxErase.rotateZ(Math.PI/2);
          boxErase.rotateY(Math.PI/2);
          boxErase.translate(22,-1,0);
          var boxEraseMesh = new THREE.Mesh(boxErase,material);

          var csg = new CSG();
          csg.union([boxMesh]);
          csg.subtract([boxEraseMesh]);
          this.res = csg.toMesh();


          return this.res;
      }
  
      
      update () {
          
      }
}

export { Medio };