// import * as THREE from "three";
// import { useThree } from "@react-three/fiber";
// import { useEffect } from "react";

// const SceneShotHelper = ({
//   onReady,
// }: {
//   onReady: (gl: THREE.WebGLRenderer) => void;
// }) => {
//   const { gl } = useThree();
//   useEffect(() => {
//     onReady(gl);
//   }, [gl, onReady]);
//   return null;
// };

// // Hàm chụp
// export const takeScreenshot = (gl: THREE.WebGLRenderer) => {
//   const dataURL = gl.domElement.toDataURL("image/png");
//   return dataURL; // base64 string
// };
