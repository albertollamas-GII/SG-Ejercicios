import * as THREE from '../libs/three.module.js'


class Helicoide extends THREE.Object3D{
    constructor(gui){
        super();

        this.createGUI(gui);

        var cylinderGeometry = new THREE.CylinderGeometry(this.guiControls.radius, this.guiControls.radius, 20,20);
        var material = new THREE.MeshNormalMaterial({opacity: 0.35, transparent: true});

        this.cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
        this.cylinderMesh.position.y = this.guiControls.radius;
        this.add(this.cylinderMesh);

        var pelotaGeom = new THREE.SphereGeometry(1, 10, 10);
        var materialPelota = new THREE.MeshNormalMaterial();
        this.pelotaA = new THREE.Mesh(pelotaGeom, materialPelota);
        this.pelotaB = new THREE.Object3D();
        this.pelotaB.add(this.pelotaA);
        this.add(this.pelotaB);
        this.reloj = new THREE.Clock();
        this.tiempoAnterior = this.reloj.getDelta();
        this.velocidadRotacion = Math.PI/2;
    }

    createGUI (gui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
          this.radius = 10;
        }
    
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder ("Controles Cilindro :");
        var that = this;
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radius', 5, 25.0, 0.1).name ('Radio : ').onChange(function(value){that.crearNueva()});
    }

    crearNueva(){
        var cylinderGeom = new THREE.CylinderGeometry( this.guiControls.radius,this.guiControls.radius, 20, 20);
        this.cylinderMesh.geometry = cylinderGeom;
    }

    update () {
        this.pelotaA.position.x = this.guiControls.radius;
    
        var tiempoActual = this.reloj.getDelta();
        var segundos = (tiempoActual - this.tiempoAnterior)/1000;
        this.pelotaB.rotation.y  += segundos * this.velocidadRotacion;

        if(this.subiendo){
            this.pelotaB.position.y +=  segundos * this.velocidadRotacion;
            if(this.pelotaB.position.y >= 19){
                this.subiendo = false;
            }
        } else{
            this.pelotaB.position.y -= segundos * this.velocidadRotacion;
            if(this.pelotaB.position.y <= 1){
                this.subiendo = true;
            }
        }
    
        this.tiempoAnterior = tiempoActual;
    }
}

export {Helicoide};