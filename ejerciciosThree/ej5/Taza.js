import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Taza extends THREE.Object3D{
    constructor() {
        super();
    
        this.taza = this.createTaza();
    
        this.add(this.taza);
        
        // Las geometrías se crean centradas en el origen.
        // Como queremos que el sistema de referencia esté en la base,
        // subimos el Mesh de la caja la mitad de su altura
      }
    
    
      createTaza(){
          //Se crean las geometrias
         var cilindroTaza = new THREE.CylinderGeometry(5,5,10,20);
         var asaTaza = new THREE.TorusGeometry(3.5, 0.5, 50,20);
         var cilindroDiferencia = new THREE.CylinderGeometry(4.5,4.5,10,20);

         //Se posicionan y se orientan
         asaTaza.translate(-5,0,0);
         cilindroDiferencia.translate(0,2,0);
        //Se crea el material
        var material = new THREE.MeshNormalMaterial();
        var material2 = new THREE.MeshPhongMaterial({color:0x00ff00});
         //Se construyen los Meshes
        var meshCilindroTaza = new THREE.Mesh(cilindroTaza,material2);
        var meshAsa = new THREE.Mesh(asaTaza,material);
        var meshCilindroInterior = new THREE.Mesh(cilindroDiferencia, material);

        var csg = new CSG();
        csg.union([meshCilindroTaza,meshAsa]);
        csg.subtract([meshCilindroInterior]);

        var resultadoMesh = csg.toMesh();

        return (resultadoMesh);

      }
  
      
      update () {
          
      }
}

export { Taza };