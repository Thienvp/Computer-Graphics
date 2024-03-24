// import * as THREE from 'three';
const init = () => {
	const scene = new THREE.Scene();

	const box = getBox(1,1,1) ;
	box.position.y = box.geometry.parameters.height ;
	box.position.x = - 1.5* box.geometry.parameters.width;
	scene.add(box) ;
	
	const cone = getCone(1,1,16) ;
	cone.position.y = cone.geometry.parameters.height ;
	cone.position.x = box.geometry.parameters.width ;
	scene.add( cone );

	const cylinder = getCylinder (1,1,1,32);
	cylinder.position.y = cone.geometry.parameters.height* 2;
	cylinder.position.x = cone.position.x ;
	scene.add( cylinder );


	const plane = getPlane(6,4) ;
	plane.rotation.x = Math.PI/2;
	scene.add(plane);
	
	const camera = new THREE.PerspectiveCamera( 
			60,
			window.innerWidth / window.innerHeight, 
			1, 
			1000 
		);
	camera.position.x = 0 ;
	camera.position.y = 3	 ; 
	camera.position.z = 6 ;

	camera.lookAt( new THREE.Vector3(0,0,0));

	const renderer = new THREE.WebGLRenderer();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	// renderer.render( scene, camera );
	const animate = () => {
		requestAnimationFrame( animate );
		box.rotation.x += 0.01;
		box.rotation.y += 0.01;
		cone.rotation.y += 0.01 ;
		cylinder.rotation.y -= 0.01 ;
		renderer.render( scene, camera );
	} ; animate() ;


}
const getEdge = (geometry) => {
	const edgesGeo = new THREE.EdgesGeometry(geometry) ;
	const edgesMate = new THREE.LineBasicMaterial(
		{color : 0x000000 } 
	) ;
	const edges = new THREE.LineSegments(edgesGeo, edgesMate) ;
	return edges ;
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
	const edges = getEdge(geometry) ;
	mesh.add(edges);
	return mesh ;
}
const getCone = (r,h,rs ) => {
	const geometry = new THREE.ConeGeometry( r, h, rs ); 
	const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	const mesh = new THREE.Mesh(geometry, material );
	const edges = getEdge(geometry) ;
	mesh.add(edges);
	return mesh ;
}
const getCylinder = (rt,rb,h,rs) => {
	const geometry = new THREE.CylinderGeometry( rt, rb, h, rs ); 
	const material = new THREE.MeshBasicMaterial( {color: 0x00E278} ); 
	const mesh = new THREE.Mesh( geometry, material );
	const edges = getEdge(geometry);
	mesh.add(edges);
	return mesh ; 
}
const getPlane = (x,y) => {
	const geometry = new THREE.PlaneGeometry( x, y );
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

