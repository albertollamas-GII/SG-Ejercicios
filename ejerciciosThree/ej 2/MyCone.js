import * as THREE from '../libs/three.module.js'

class MyCone extends THREE.Object3D{
    constructor(gui, titleGUI){
        super();
        this.createGUI(gui,titleGUI);
        this.radio = 1;
        this.altura = 2;
        this.resolucion = 3;
        this.coneGeometry = new THREE.ConeBufferGeometry(this.radio,this.altura,this.resolucion);
        this.material = new THREE.MeshNormalMaterial();
        this.material.flatShading = true;
        this.material.needsUpdate = true;
        this.cono = new THREE.Mesh(this.coneGeometry, this.material);
        this.add(this.cono);
        this.scale.set(0.2,0.2,0.2);
    }

    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición del cono
        this.guiControls = {
          radio : 1.0,
          altura : 1.0,
          resolucion : 1.0,
          
          // Un botón para dejarlo todo en su posición inicial
          // Cuando se pulse se ejecutará esta función.
          reset : () => {
            this.guiControls.radio = 1.0;
            this.guiControls.altura = 1.0;
            this.guiControls.resolucion = 1.0;
          }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radio', 1, 6.0, 0.2).name ('Radio : ').onChange ((value)=>this.cambiarRadio(value));
        folder.add (this.guiControls, 'altura', 1, 6.0, 0.2).name ('Altura : ').onChange ((value)=>this.cambiarAltura(value));
        folder.add (this.guiControls, 'resolucion', 1, 20.0, 1.0).name ('Resolucion : ').onChange ((value)=>this.cambiarResolucion(value));
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
      }
      cambiarResolucion(value){
          this.resolucion = value;

          this.cono.geometry.dispose();
          this.cono.geometry = new THREE.ConeBufferGeometry(this.radio, this.altura, this.resolucion);
      }

      cambiarRadio(value){
        this.radio = value;

        this.cono.geometry.dispose();
        this.cono.geometry = new THREE.ConeBufferGeometry(this.radio, this.altura, this.resolucion);
    }
    cambiarAltura(value){
        this.altura = value;

        this.cono.geometry.dispose();
        this.cono.geometry = new THREE.ConeBufferGeometry(this.radio, this.altura, this.resolucion);
    }
      update () {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
        this.rotation.y += 0.01;
        this.rotation.x += 0.01;
        this.rotation.z += 0.01;


      }
}

export {MyCone} ;