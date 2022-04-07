import * as TWEEN from '../libs/tween.esm.js' 
import * as THREE from '../libs/three.module.js'


class Nave extends THREE.Object3D{
    constructor(){
        super();
        //Creamos la nave y la pista
        this.coche = this.createNave();
        this.camino = this.createPista();
        this.add(this.coche);
        this.add(this.camino);
        this.curva = this.createCurva();

        //Ahora viene TWEEN
        //como me pide que haga 2 recorridos uno en 4s y otro en 8 tengo 2 origenes y dos destinnos
        var that = this;
        //Movimiento por Tween
        var origenizq = {recorrido : 0};
        var destinoizq = {recorrido : 0.35};
        var origender = {recorrido : 0.35};
        var destinoder = {recorrido : 1};

        this.animacion1 = new TWEEN.Tween(origenizq).to(destinoizq,4000);
        this.animacion2 = new TWEEN.Tween(origender).to(destinoder,8000);
        this.animacion1.easing(TWEEN.Easing.Quadratic.InOut);
        this.animacion2.easing(TWEEN.Easing.Cubic.InOut);
        this.animacion1.onUpdate(function(){
            var posicion = that.curva.getPointAt(origenizq.recorrido);
            that.coche.position.copy(posicion);
            var tangente = that.curva.getTangentAt(origenizq.recorrido);
            posicion.add(tangente);
            that.coche.lookAt(posicion);
        });
        
        this.animacion2.onUpdate(function(){
            var posicion = that.curva.getPointAt(origender.recorrido);
            that.coche.position.copy(posicion);
            var tangente = that.curva.getTangentAt(origender.recorrido);
            posicion.add(tangente);
            that.coche.lookAt(posicion);
        });
        this.animacion1.chain(this.animacion2);
        this.animacion2.chain(this.animacion1);
        this.animacion1.start();

    }

    createPista(){
        var curva = this.createCurva();
        var points = curva.getPoints( 60 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );

        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
 
        // Create the final object to add to the scene
         var curveObject = new THREE.Line( geometry, material );
         return curveObject;
    }

    createCurva(){
        var curva = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0,2,0),
                new THREE.Vector3(-4,2,4),
                new THREE.Vector3(-8,2,0),
                new THREE.Vector3(-4,2,-4),
                new THREE.Vector3(0,-4,0),
                new THREE.Vector3(8,-4,8),
                new THREE.Vector3(12,-4,0),
                new THREE.Vector3(6,-4,-6),
            ],true,'catmullrom',1
        );
        return curva;
    }

    createNave(){
        var naveGeom = new THREE.ConeGeometry(0.5,1,3);
        //GRADOS EN RADIANES QUE SE TE OLVIDA
        naveGeom.rotateX(Math.PI /2);

        var naveMaterial = new THREE.MeshPhongMaterial({color:0xAA00CC});
        var nave = new THREE.Mesh(naveGeom, naveMaterial);

        return nave;
    }
}

export {Nave};