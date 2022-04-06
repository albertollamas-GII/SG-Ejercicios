import * as THREE from '../libs/three.module.js'
class CorazonBarrido extends THREE.Object3D {
    constructor() {
      super();
  
      this.corazonBarrido = this.createCorazonBarrido();
  
      this.add(this.corazonBarrido);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
    }
  
    createCamino(){
        var radius = 1.5 ;
        var heightStep  = 2 ;
        var turns = 2;
        var pointsPerTurn = 20;

        var angleStep = (Math.PI * 2) / pointsPerTurn ;

        var puntos = [] ;

        for(var i = 0 ; i < turns*pointsPerTurn ; i++){
            puntos.push(new THREE.Vector3(
                Math.cos(angleStep * i) * radius,
                heightStep * i,
                Math.sin(angleStep * i) * radius
            ));

            
        }

        var curve = new THREE.CatmullRomCurve3(puntos);
        return curve;
    }
  
    createCorazonBarrido(){
        var contorno = new THREE.Shape();
      contorno.bezierCurveTo(-0.5,1,-1,3,-5,5);
      contorno.bezierCurveTo(-7,6,-7.5,8,-7,9);
      contorno.bezierCurveTo(-6,12,-4,13,0,9);
      contorno.bezierCurveTo(4,13,6,12,7,9);
      contorno.bezierCurveTo(7.5,8,7,6,5,5);
      contorno.bezierCurveTo(1,3,0.5,1,0,0);

        var camino = this.createCamino();

        var extrudeSettings = { amount: 50, curveSegments: 50 , steps: 50, extrudePath: camino};
       
        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        geometry.translate(0,35,0);

        this.mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0x00ff00}) );

        this.hijo1 = new THREE.Object3D();
        this.hijo1.position.x = 50;
        this.hijo1.add(this.mesh);
      
        return (this.hijo1);
    }

    
    update () {
        this.mesh.rotation.y += 0.005;
        this.mesh.rotation.x += 0.005;
        
    }
  }
export {CorazonBarrido};