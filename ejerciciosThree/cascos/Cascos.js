import * as TWEEN from '../libs/tween.esm.js' 
import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js';

class Cascos extends THREE.Object3D{

    constructor(gui){
        super();

        this.createGUI(gui);
        this.activado = true;
        this.reloj = new THREE.Clock();
        this.velocidad = 1;

        this.auricularDerecho = this.createAuricular();
        this.auricularDerecho.translateZ(4);

        this.auricularIzquierdo = this.createAuricular();
        this.auricularIzquierdo.rotateY(Math.PI);
        this.auricularIzquierdo.translateZ(4);

        this.cabezal = this.createCabezal();

        this.cascos = new THREE.Group();
        this.cascos.add(this.auricularDerecho);
        this.cascos.add(this.auricularIzquierdo);
        this.cascos.add(this.cabezal);

        this.add(this.cascos);
        
        this.camino = this.createPista();
        this.add(this.camino);

        //Ahora viene TWEEN
        var that = this;
        this.curva = this.createCurva();
        var origen = {recorrido : 0};
        var destino = {recorrido : 1};
        this.animacion = new TWEEN.Tween(origen).to(destino,5000).yoyo(true).repeat(Infinity).delay(2000);
        this.animacion.easing(TWEEN.Easing.Quadratic.InOut);
        this.animacion.onUpdate(function(){
            var posicion = that.curva.getPointAt(origen.recorrido);
            that.cascos.position.copy(posicion);
            // that.cascos.lookAt(posicion);
        });

    
        this.animacion.start();
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
                new THREE.Vector3(0,0,0),
                new THREE.Vector3(0,8,0),
                new THREE.Vector3(0,24,8),
                new THREE.Vector3(0,12,24),
                new THREE.Vector3(0,0,24),
            ],false,'catmullrom',1
        );
        return curva;
    }


    createGUI(gui){
        this.guiControls = new function () {
            this.velocidad = 1;
            this.activado = true;
        }

        gui.add(this.guiControls, 'velocidad', -5, 5, 1).name('Velocidad: ').onChange((value) => this.cambiarVelocidad(value));;
        gui.add(this.guiControls,'activado')
            .name ('Animacion : ')
            .onChange ( (value) => this.setAnimacion (value) );
    }
    setAnimacion(value){
            this.activado = value;
    }
    createCabezal(){
        var cabezal = new THREE.TorusGeometry(5,0.5,14,5,6.283185307179586/2);
        cabezal.rotateY(Math.PI / 2);
        cabezal.scale(1,1.5,1.12);
        var material = new THREE.MeshNormalMaterial();

        var meshCabezal = new THREE.Mesh(cabezal, material);
        var color = new THREE.MeshPhongMaterial({color: 0x000000});
        var intersect = new THREE.BoxGeometry(20,2.8,10);
        intersect.scale(1.2,1.4,1.1);
		var caja1 = new THREE.Mesh(intersect, color);
        var csg = new CSG();
        csg.union([meshCabezal]);	
        csg.subtract([caja1]);
        this.cabezalCortado = csg.toMesh();

        return this.cabezalCortado;
    }

    createAuricular(){
        var esferaGeometry = new THREE.SphereGeometry(2,20,30);
        esferaGeometry.scale(1.2,1.4,1.1);


        var almohadilla = new THREE.TorusGeometry(2, 0.5, 50,20);
        almohadilla.scale(1.2,1.4,1.1);
        var material = new THREE.MeshNormalMaterial();

        var meshAlmohadilla = new THREE.Mesh(almohadilla,material);
        var esfera = new THREE.Mesh(esferaGeometry, material);

        var color = new THREE.MeshPhongMaterial({color: 0x000000});
        var caja = new THREE.SphereGeometry(2,20,30);
        caja.scale(1.2,1.4,1.1);
        caja.translate(0,0,-1);
		var caja1 = new THREE.Mesh(caja, color);

        var csg = new CSG();
        csg.union([esfera, meshAlmohadilla]);	
        csg.subtract([caja1]);
        this.auriculares = csg.toMesh();
        // this.auriculares = new THREE.Object3D();
        // this.auriculares.add(meshAsa); this.auriculares.add(esfera);

        return this.auriculares;
    }
    cambiarVelocidad (value) {
        this.velocidad = value * Math.PI /6
    }

    update(){
        TWEEN.update();

        if (this.activado){
            this.cascos.rotation.y -= this.velocidad * this.reloj.getDelta();
        } 

    }

}

export {Cascos};