import * as THREE from '../libs/three.module.js'

import { CSG } from '../libs/CSG-v2.js'


class MyTuerca extends THREE.Object3D {
	constructor(gui) {
		super();

        var material = new THREE.MeshNormalMaterial();

        var esfera = new THREE.SphereGeometry();

        var cilInt1 = new THREE.CylinderGeometry();
        var cilInt2 = new THREE.CylinderGeometry();
        var cilInt3 = new THREE.CylinderGeometry(0.5, 0.5);

        var caja = new THREE.BoxGeometry(2.0);

        var cilExtMesh = new THREE.Mesh(esfera ,material );

        var cilindroMesh = new THREE.Mesh(cilInt1 ,material );
        var cilindroMesh2 = new THREE.Mesh(cilInt2 ,material );
        var cilindroMesh3 = new THREE.Mesh(cilInt3 ,material );

        var toroMesh = new THREE.Mesh(caja ,material );

        var csg =  new CSG();
        csg.intersect ([cilExtMesh, toroMesh]);
        csg.union([cilindroMesh, cilindroMesh2]);
        csg.intersect([cilindroMesh2]);
        csg.subtract([cilindroMesh3]);

        var resultadoMesh = csg.toMesh();

        this.add(resultadoMesh);
	}

	update() {
	}
}

export { MyTuerca };
