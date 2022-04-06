import * as THREE from '../libs/three.module.js'

class MyPeon extends THREE.Object3D {
  constructor(gui, titleGUI, numRevo) {
    super();
    this.createGUI(gui, titleGUI);
    
    this.angulo = 0;
    this.resolucion = numRevo;

    this.points = [];

    this.points.push(new THREE.Vector2(0.0, -1.4));
    this.points.push(new THREE.Vector2(1.0, -1.4));
    this.points.push(new THREE.Vector2(1.0, -1.1));
    this.points.push(new THREE.Vector2(0.5, -0.7));
    this.points.push(new THREE.Vector2(0.4, -0.4));
    this.points.push(new THREE.Vector2(0.4, 0.5));
    this.points.push(new THREE.Vector2(0.5, 0.6));
    this.points.push(new THREE.Vector2(0.3, 0.6));
    this.points.push(new THREE.Vector2(0.5, 0.8));
    this.points.push(new THREE.Vector2(0.55, 1.0));
    this.points.push(new THREE.Vector2(0.5, 1.2));
    this.points.push(new THREE.Vector2(0.3, 1.4));
    this.points.push(new THREE.Vector2(0.0, 1.5));

    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading = true;
    this.material.needsUpdate = true;
    
    if (this.resolucion <= 1){
      this.lineaPeon = new THREE.BufferGeometry().setFromPoints(this.points);
      this.peon = new THREE.Line(this.lineaPeon, this.material);
    }
    
    this.geometriaPeon = new THREE.LatheBufferGeometry(this.points, this.resolucion);
    this.peon = new THREE.Mesh(this.geometriaPeon, this.material);
    
    this.add(this.peon);

  }

  createGUI(gui, titleGui) {
    // Controles para el tamaño, la orientación y la posición del cono
    this.guiControls = {
      resolucion: 1.0,
      angulo: 0.1,

      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset: () => {
        this.guiControls.angulo = 0.1;
        this.guiControls.resolucion = 1.0;
      }
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
   
    folder.add(this.guiControls, 'angulo', 0.1, 2.0*Math.PI, 0.1).name('Angulo : ').onChange((value) => this.cambiarAngulo(value));
    folder.add(this.guiControls, 'resolucion', 1, 20.0, 1.0).name('Resolucion : ').onChange((value) => this.cambiarResolucion(value));

    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }
  cambiarResolucion(value) {
    this.resolucion = value;

    this.peon.geometry.dispose();
    this.peon.geometry = new THREE.LatheBufferGeometry(this.points, this.resolucion);
  }

  cambiarAngulo(value) {
    this.angulo = value;

    this.peon.geometry.dispose();
    this.peon.geometry = new THREE.LatheBufferGeometry(this.points, this.resolucion, 0, this.angulo);
  }
  
  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    // this.rotation.y += 0.01;
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;


  }
}

export { MyPeon };