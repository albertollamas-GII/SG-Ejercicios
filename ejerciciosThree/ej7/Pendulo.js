import * as THREE from '../libs/three.module.js'

class Pendulos extends THREE.Object3D{
    constructor(gui,titleGui){
        super();

        this.createGUI(gui,titleGui);

        var ejes = this.createAxis();
        this.pendulomini = this.createPenduloPequeño() ;
        this.pendulomovil = this.createPenduloMovil() ;
        this.pendulomaxi = this.createPenduloGrande() ;
        var pivotegeneralGeom = new THREE.CylinderGeometry(0.4,0.4,1.5,20) ;
        var pivotegeneralMat = new THREE.MeshPhongMaterial({color:0xFF00FF});
        var pivote = new THREE.Mesh(pivotegeneralGeom,pivotegeneralMat) ;
        pivote.rotateX(Math.PI/2);
        pivote.position.y = 0;


        this.pendulum = new THREE.Object3D();
        this.pendulum.add(this.pendulomini);

        this.pendulocomp = new THREE.Object3D();
        this.pendulocomp.add(this.pendulomovil);
        this.pendulocomp.add(this.pendulomaxi);
        this.pendulocomp.position.y = -4;

        this.add(ejes);
        this.add(this.pendulum);
        this.add(this.pendulocomp);
        this.add(pivote);
        this.tope = true;
        
    }

    createGUI(gui,titleGui){
        this.guiControls = new function(){
            this.escala = 1.0 ;
            this.posicion = 0.0 ;
            this.rotacionGrande = 0.0 ;
            this.rotacionPeque = 0.0 ;

            this.reset = function(){
                this.escala = 1.0 ;
                this.posicion = 0.0 ;
                this.rotacionGrande = 0.0 ;
                this.rotacionPeque = 0.0 ;
            }

        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'escala', 1,5,0.1).name('Escala : ').listen();
        folder.add(this.guiControls, 'posicion', 0.0,0.9,0.1).name('Posición(%) : ').listen();
        folder.add(this.guiControls, 'rotacionGrande', -Math.PI/4,Math.PI/4,0.1).name('Rotación P.Grande : ').listen();
        folder.add(this.guiControls, 'rotacionPeque', -Math.PI/4,Math.PI/4,0.1).name('Rotación P.Mini : ').listen();
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    createPenduloPequeño(){
        var tablonGeom = new THREE.BoxGeometry(1,5,1);
        var pivoteGeom = new THREE.CylinderGeometry(0.4,0.4,1.5,20);
        var tablonMaterial = new THREE.MeshPhongMaterial({color:0x0000EE});
        var pivoteMaterial = new THREE.MeshPhongMaterial({color:0xFFFF00});
        var tablon = new THREE.Mesh(tablonGeom,tablonMaterial);
        tablon.position.set(0,-2,0);
        var pivote = new THREE.Mesh(pivoteGeom,pivoteMaterial);
        pivote.rotateX(Math.PI/2);
        
        var penduloPequeño = new THREE.Object3D();
        penduloPequeño.add(tablon);
        penduloPequeño.add(pivote);
        penduloPequeño.position.z=1.2;

        return penduloPequeño;
    }

    createPenduloMovil(){
        var tablonGeom = new THREE.BoxGeometry(1.5,7,1.5);
        var tablonMaterial = new THREE.MeshPhongMaterial({color:0xFF0000});
        var tablon = new THREE.Mesh(tablonGeom,tablonMaterial) ;
        console.log(tablon.geometry);
        return tablon;
    }

    createPenduloGrande(){
        var tablonGeom = new THREE.BoxGeometry(1,9,1);
        var tablonMaterial = new THREE.MeshPhongMaterial({color:0x00FF00})
        var tablon = new THREE.Mesh(tablonGeom,tablonMaterial);
        
        var penduloPequeño = new THREE.Object3D();
        penduloPequeño.add(tablon);

        return penduloPequeño;
    }

    createAxis(){
        this.axis = new THREE.AxesHelper (5);
        this.add (this.axis);
      }

    update(){
        this.pendulum.rotation.z = this.guiControls.rotacionPeque;
        this.rotation.z = this.guiControls.rotacionGrande;
        this.pendulocomp.scale.y = this.guiControls.escala;
        this.pendulocomp.position.y = -4*this.pendulocomp.scale.y;
        this.pendulum.position.y =  0.25*this.pendulocomp.position.y-this.guiControls.posicion * this.pendulocomp.children[0].geometry.parameters.height*this.pendulocomp.scale.y ;
        
    }
}

export {Pendulos};