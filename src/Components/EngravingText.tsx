// "use client";

// import * as THREE from "three";
// import { Canvas, useLoader, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { CSG } from "three-bvh-csg";
// import { useMemo } from "react";

// function RingWithEngraving() {
//   const font = useLoader(
//     THREE.FontLoader,
//     "/fonts/helvetiker_regular.typeface.json",
//   );

//   const engravedMesh = useMemo(() => {
//     // Nhẫn (giả sử torus thay cho ring custom)
//     const ringGeom = new THREE.TorusGeometry(1, 0.3, 32, 100);
//     const ringMesh = new THREE.Mesh(ringGeom);

//     // Text
//     const textGeom = new THREE.TextGeometry("JM 18K", {
//       font: font,
//       size: 0.15,
//       height: 0.05,
//     });
//     textGeom.center();
//     const textMesh = new THREE.Mesh(textGeom);

//     // Đặt text vào vị trí mặt trong của nhẫn
//     textMesh.rotation.x = Math.PI / 2;
//     textMesh.position.set(0, -0.1, 1);

//     // Boolean: nhẫn - text
//     const result = CSG.subtract(ringMesh, textMesh);

//     return result;
//   }, [font]);

//   return (
//     <primitive
//       object={engravedMesh}
//       material={
//         new THREE.MeshStandardMaterial({
//           color: "gold",
//           metalness: 1,
//           roughness: 0.3,
//         })
//       }
//     />
//   );
// }

// export default function App() {
//   return (
//     <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} />
//       <RingWithEngraving />
//       <OrbitControls />
//     </Canvas>
//   );
// }
