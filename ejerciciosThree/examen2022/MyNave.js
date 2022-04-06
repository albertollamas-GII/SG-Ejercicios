// Alumno: Carracedo Rodríguez, Miguel

import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { CSG } from '../libs/CSG-v2.js'


class MyNave extends THREE.Object3D {
	constructor(gui) {
		super();

		this.createGUI(gui);
		this.activado = true;


		var superior = new THREE.SphereGeometry(2,20,20);
		var inferior = superior.clone();
		var ojo1 = new THREE.CylinderGeometry(0.3, 0.3, 4);
		var caja = new THREE.BoxGeometry(11, 10, 10);

		caja.translate(0, -3, 0);
		ojo1.rotateZ(Math.PI/2);
		ojo1.translate(0, 1, 1);
		

		var color = new THREE.MeshPhongMaterial({color: 0xFFFF00});
		var otro = new THREE.MeshNormalMaterial();

		var comeCocos = new THREE.Mesh(superior, color);
		var comeCocos1 = new THREE.Mesh(inferior, color);
		var caja1 = new THREE.Mesh(caja, color);
		var caja2 = new THREE.Mesh(caja, color);
		var ojo = new THREE.Mesh(ojo1, color);
//--------------------------------------------------------------------------------

		var esferaderecha = new THREE.SphereGeometry(4,20,20);
		var esferaizquierda = esferaderecha.clone();
		var interiorderecho = new THREE.TorusGeometry(4,0.5,16,100);
		var interiorizquierdo = new THREE.TorusGeometry(4,0.5,16,100);
		var cabeza = new THREE.TorusGeometry(6,0.5,16,100);

		interiorderecho.rotateY(4.74);
		interiorizquierdo.rotateY(4.74);



		esferaizquierda.translate (-4,-1.5,0);
		esferaderecha.translate (4,-1.5,0);

		interiorderecho.translate (5.5,-1.5,0);
		interiorizquierdo.translate (-5.5,-1.5,0);



		var esferadf = new THREE.Mesh(esferaderecha, otro);
		var esferaif = new THREE.Mesh(esferaizquierda, otro);
		var cabezaf = new THREE.Mesh(cabeza, otro);
		var interiori = new THREE.Mesh(interiorizquierdo, otro);
		var interiord = new THREE.Mesh(interiorderecho, otro);


		caja.translate(0,0.5,0);

		


//---------------------------------------------------------------------------------

		caja2.position.y = 4;

		this.ojo = new THREE.Mesh(ojo1, otro);


		var csg =  new CSG();
		csg.union([esferadf]);	
		csg.subtract([caja1]);

		this.resultado = csg.toMesh();

		this.auriculares = new THREE.Group();
		this.auriculares.add(this.resultado);
		this.auriculares.add(interiori);
		this.auriculares.add(interiord);


		var csg1 =  new CSG();
		csg1.union([esferaif]);
		csg1.subtract([caja1]);

		this.resultado1 = csg1.toMesh();

		this.auriculares.add(this.resultado1);

		//caja1.translate(0,-10,0);


		var csg2 =  new CSG();
		csg2.union([cabezaf]);
		csg2.subtract([caja1]);
		this.resultado2 = csg2.toMesh();

		this.auriculares.add(this.resultado2);


		this.ascendente = true;

		this.pacman = new THREE.Group().add( this.auriculares);


		//this.add(this.resultado);
		//this.add(this.resultado1);
		//this.add(interiord);
		//this.add(interiori);
		//this.add(caja1);
		//this.add(this.resultado2);

		this.add(this.auriculares);



		// Crear los puntos de la trayectoria
        
		this.points = [
			new THREE.Vector3(-5, -5, 0),
			new THREE.Vector3(-2, 5, 0),
			new THREE.Vector3(0, 10, 0),
			new THREE.Vector3(3, 5, 0),
			new THREE.Vector3(5, -5, 0),
		];

		this.points2 = [
			new THREE.Vector3(5, -5, 0),
			new THREE.Vector3(3, 5, 0),
			new THREE.Vector3(0, 10, 0),
			new THREE.Vector3(-2, 5, 0),
			new THREE.Vector3(-5, -5, 0),


		];

		this.curva = new THREE.CatmullRomCurve3(this.points, false);
		this.curva2 = new THREE.CatmullRomCurve3(this.points2, false);


		var points = this.curva.getPoints(100);
		var points2 = this.curva2.getPoints(100);


		var geo1 = new THREE.BufferGeometry().setFromPoints(points);
		var geo2 = new THREE.BufferGeometry().setFromPoints(points2);


		var material = new THREE.LineBasicMaterial({color : 0xFF0000});

		this.spline = new THREE.Line(geo1, material);
		this.spline = new THREE.Line(geo2, material);


		//this.add(this.spline);
		//this.createAnimation();
	}


    createAnimation() {
		var origen = {x:0};
		var tiempo1 = 4000;
		
		this.movimiento = new TWEEN.Tween(origen).to({x: 0.4}, tiempo1);
		this.movimiento.easing(TWEEN.Easing.Sinusoidal.InOut).interpolation(TWEEN.Interpolation.CatmullRom);

		var that = this;
		this.movimiento.onUpdate(function (object) {
			var posicion = that.curva.getPointAt(object.x);
            that.auriculares.position.copy(posicion);
            var tangente = that.curva.getTangentAt(object.x);
            posicion.add(tangente);
            that.auriculares.lookAt(posicion);
		})
		.onStart(() =>  origen = {x:0});


		
        var origen2 = {x:0.4};
		var tiempo2 = 4000;
		
		this.movimiento2 = new TWEEN.Tween(origen2).to({x: 1.0}, tiempo2);
		this.movimiento2.easing(TWEEN.Easing.Sinusoidal.InOut).interpolation(TWEEN.Interpolation.CatmullRom);

		this.movimiento2.onUpdate(function (object) {
			var posicion = that.curva2.getPointAt(object.x);
            that.auriculares.position.copy(posicion);
            var tangente = that.curva2.getTangentAt(object.x);
            posicion.add(tangente);
            that.auriculares.lookAt(posicion);
		})
        .onStart(() =>  origen2 = {x:0.4});

		this.movimiento.chain(this.movimiento2);
		this.movimiento2.chain(this.movimiento);
	}



	createGUI(gui) {
		this.controlesReloj = new function() {
			this.velocidad = 0.05;
			this.activado = true;
		}

		var folderReloj = gui.addFolder("Auriculares");

		folderReloj.add(this.controlesReloj, 'velocidad', -1, 1, 0.05).name ('Segundos por : ');
		folderReloj.add(this.controlesReloj, 'activado').name ('Animación : ');
	}



	update() {
		//if(!this.movimiento.isPlaying() && !this.movimiento2.isPlaying())
		//	this.movimiento.start();

		const angulo = 2*Math.PI


		if(this.controlesReloj.activado){
			this.auriculares.rotation.y += this.controlesReloj.velocidad;
		}


	}

}

export { MyNave };
