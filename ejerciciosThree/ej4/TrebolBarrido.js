import * as THREE from '../libs/three.module.js'
class TrebolBarrido extends THREE.Object3D {
    constructor() {
      super();
  
      this.trebol_barrido = this.createTrebolBarrido();
  
      this.add(this.trebol_barrido);
      
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
  
    createTrebolBarrido(){
        var contorno = new THREE.Shape();

        contorno.moveTo(0,0);
        
        contorno.bezierCurveTo(5,-4.5,7,3.5,1.5,3);
        contorno.bezierCurveTo(4.6,9,-4.6,9,-1.5,3);
        contorno.bezierCurveTo(-7,3.5,-4.5,-5,0,0);

        var camino = this.createCamino();

        var extrudeSettings = { amount: 50, curveSegments: 50 , steps: 50, extrudePath: camino};
       
        var geometry = new THREE.ExtrudeBufferGeometry( contorno, extrudeSettings );

        geometry.translate(0,-35,0);

        this.mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color : 0x00ff00}) );

        this.hijo1 = new THREE.Object3D();
        this.hijo1.position.x = -50;
        this.hijo1.add(this.mesh);
      
        return (this.hijo1);
    }

    
    update () {
        this.mesh.rotation.y += 0.005;
        this.mesh.rotation.x += 0.005;
        
    }
  }
export {TrebolBarrido};