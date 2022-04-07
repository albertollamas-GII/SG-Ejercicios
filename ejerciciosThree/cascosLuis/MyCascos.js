import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import TWEEN from "../libs/tween.esm.js";

class Cascos extends THREE.Object3D{

    constructor(){
        super();

        this.reloj = new THREE.Clock();

        this.velocidad = Math.PI / 6;

        //Material
        var mat = new THREE.MeshNormalMaterial();

        //Creamos los dos auriculares
        this.auricularder = this.crearAuricular(mat);
        this.auricularizq = this.crearAuricular(mat);

        this.crearSpline();

        //Creamos la areola
        var gAreola = new THREE.TorusGeometry(7.5,0.5,15,15,Math.PI)
        gAreola.translate(0,-7,0);
        this.areola = new THREE.Mesh(gAreola,mat);

        this.auricularder.position.setX(7.5);
        this.auricularizq.position.setX(-7.5);
        this.auricularder.position.setY(-10);
        this.auricularizq.position.setY(-10);

        var csgFinal = new CSG();
        csgFinal.union([this.auricularder,this.auricularizq]);
        csgFinal.union([this.areola]);
        this.modeloFinal = csgFinal.toMesh();

        this.add(this.modeloFinal);

        this.modeloFinal.position.setX(25);


        //Creamos el caminito
        this.crearCaminoTwenn();

    }

    crearAuricular(mat){
        //Crear el ovalo del auricular
        let gEsferaIzq = new THREE.SphereGeometry(5,15,15);
        let gEsferaDer = new THREE.SphereGeometry(5,15,15);
        let gtoroide = new THREE.TorusGeometry(4,1,15,15);

        gEsferaDer.translate(0,0,-3);
        gEsferaIzq.translate(0,0,3);

        var esferaIzq = new THREE.Mesh(gEsferaIzq,mat);
        var esferaDer = new THREE.Mesh(gEsferaDer,mat);
        var toroide = new THREE.Mesh(gtoroide,mat);

        var csgAuricular = new CSG();

        csgAuricular.intersect([esferaDer,esferaIzq]);
        csgAuricular.union([toroide])

        var auricular = csgAuricular.toMesh();

        auricular.rotateY(Math.PI/2);

        return auricular;
    }

    crearSpline(){
        var camino = new THREE.Shape();

        camino.moveTo(25,5);
        camino.bezierCurveTo(25,40,-25,40,-25,5);

        var puntos3d = this.vector2toVector3(camino.getPoints(100))

        this.spline = new THREE.CatmullRomCurve3(puntos3d);

        var geometryLine = new THREE.BufferGeometry();

        geometryLine.setFromPoints(this.spline.getPoints(100));

        var material = new THREE.LineBasicMaterial({color : 0XFF0000, linewidth : 2});

        var visibleSpline = new THREE.Line(geometryLine, material);

        this.add(visibleSpline);

    }

    setVelocidad(value){
        this.velocidad = value * Math.PI / 6;
    }

    crearCaminoTwenn(){
        var origen  = {p:0};
        var destino = {p:1};

        var movimiento1 = new TWEEN.Tween(origen)
            .to(destino, 4000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() =>
            {
                let t = origen.p
                if(t <= 1){
                    let posicion = this.spline.getPointAt(t);
                    //let tangente = this.spline.getTangentAt(t);

                    this.modeloFinal.position.copy(posicion);
                    //posicion.add(tangente);
                    //this.octaedro.lookAt(posicion);
                }
            })
            .yoyo(true)
            .repeat(Infinity)
            .start();
    }

    vector2toVector3 (v2) {
        var v3 = [];
        
        v2.forEach ((v) => {
          v3.push (new THREE.Vector3 (v.x, v.y, 0));
        });
        
        return v3;
      }

    update(){

        TWEEN.update();
        var that = this;
        var segundosTranscurridos = this.reloj.getDelta();
        that.modeloFinal.rotation.y += this.velocidad*segundosTranscurridos;
    }

}export{Cascos}