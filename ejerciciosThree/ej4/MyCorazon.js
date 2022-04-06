import * as THREE from '../libs/three.module.js'

class MyCorazon extends THREE.Object3D {
  constructor() {
    super();
    
    this.corazon = this.createCorazon();
    this.add(this.corazon);



  }

  createCorazon(){
      var contorno = new THREE.Shape();
      contorno.bezierCurveTo(-0.5,1,-1,3,-5,5);
      contorno.bezierCurveTo(-7,6,-7.5,8,-7,9);
      contorno.bezierCurveTo(-6,12,-4,13,0,9);
      contorno.bezierCurveTo(4,13,6,12,7,9);
      contorno.bezierCurveTo(7.5,8,7,6,5,5);
      contorno.bezierCurveTo(1,3,0.5,1,0,0);

      var extrudeSettings = { amount: 1, bevelEnabled: true, bevelSegments: 5, steps: 5, bevelSize: 1, bevelThickness: 1 };

      var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

      geometry.translate(0,-5,0);

      this.ab = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0xff0000}) );

      this.cd = new THREE.Object3D();
      this.cd.position.x = 15;
      this.cd.position.y = -15;
      this.cd.add(this.ab);

      this.e = new THREE.Object3D();
      this.e.add(this.cd);

      return this.e;
  }


  update() {
    this.e.rotation.z += 0.01;
    this.cd.rotation.z -= 0.01;
    this.ab.rotation.y += 0.01;
  }
}

export { MyCorazon };