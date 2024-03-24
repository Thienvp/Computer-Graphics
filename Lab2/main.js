import * as THREE from 'three';
const init = () => {
	const scene = new THREE.Scene();

	const box = getBox(1,1,1) ;
	box.position.y = box.geometry.parameters.height ;
	box.position.x = - box.geometry.parameters.width;
	scene.add(box) ;
	
	const cone = getCone(1,1,16) ;
	cone.position.y = cone.geometry.parameters.height ;
	cone.position.x = box.geometry.parameters.width * 2;
	scene.add( cone );

	const cylinder = getCylinder (1,1,1,32);
	cylinder.position.y = cone.geometry.parameters.height* 2;
	cylinder.position.x = cone.position.x ;
	scene.add( cylinder );


	const plane = getPlane(5) ;
	plane.rotation.x = Math.PI/2;
	scene.add(plane);
	
	const camera = new THREE.PerspectiveCamera( 
			75,
			window.innerWidth / window.innerHeight, 
			1, 
			1000 
		);
	camera.position.x = 1 ;
	camera.position.y = 2 ; 
	camera.position.z = 5 ;

	camera.lookAt( new THREE.Vector3(0,0,0));

	const renderer = new THREE.WebGLRenderer();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.render( scene, camera );
}

const getBox = (w,h,d) => {
	const geometry = new THREE.BoxGeometry( w, h, d );
	const material = new THREE.MeshBasicMaterial( 
			{ color: 0x00ff00 } 
		);
	const mesh = new THREE.Mesh(
		geometry,
		material
	) ;
	return mesh ;
}
const getCone = (r,h,rs ) => {
	const geometry = new THREE.ConeGeometry( r, h, rs ); 
	const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	const cone = new THREE.Mesh(geometry, material ); 
	return cone ;
}
const getCylinder = (rt,rb,h,rs) => {
	const geometry = new THREE.CylinderGeometry( rt, rb, h, rs ); 
	const material = new THREE.MeshBasicMaterial( {color: 0x00E278} ); 
	const cylinder = new THREE.Mesh( geometry, material );
	return cylinder ; 
}
const getPlane = (size) => {
	const geometry = new THREE.PlaneGeometry( size, size );
	const material = new THREE.MeshBasicMaterial( 
			{ 
				color: 0xff0000 ,
				side: THREE.DoubleSide
			} 
		);
	const mesh = new THREE.Mesh(
		geometry,
		material
	) ;
	return mesh ;
}


init() ; 

