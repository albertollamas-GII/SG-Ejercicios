import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js';

class MyPacman extends THREE.Object3D{

    constructor(){
        super();
        this.pacman = this.createPacman();
        // this.add(this.pacman);
    }

    createPacman(){
        var superior = new THREE.SphereGeometry(2, 20, 20);
        var inferior = superior.clone();
		var ojo1 = new THREE.CylinderGeometry(0.3, 0.3, 4);
		var caja = new THREE.BoxGeometry(10, 10, 10);
        
        caja.translate(0,-5,0);
        ojo1.rotateZ(Math.PI/2);
		ojo1.translate(0, 1, 1);

        var material = new THREE.MeshNormalMaterial();

        var esferaSuperior = new THREE.Mesh(superior,material);
        var esferaInferior = new THREE.Mesh(inferior,material);
        var ojo1Mesh = new THREE.Mesh(ojo1,material);
        var cajaMesh = new THREE.Mesh(caja,material);
        var cajaMesh2 = new THREE.Mesh(caja,material);
        cajaMesh2.translate(0,10,0);
        var csg2 = new CSG();
        csg2.union([esferaInferior]);
        csg2.subtract([cajaMesh]);
        var inferiorCSG = csg2.toMesh();
        this.add(inferiorCSG);
        var csg = new CSG();
        csg.union([esferaSuperior]);
        csg.subtract([cajaMesh]);

        var resultado = csg.toMesh();

        return(resultado);
    }
}

export{MyPacman};

