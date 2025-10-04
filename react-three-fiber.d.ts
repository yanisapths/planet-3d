import { RoundedPlaneGeometry } from "maath/geometry";
import "react-three/fiber";

declare module "react-three/fiber" {
  interface ThreeElements {
    RoundedPlaneGeometry: RoundedPlaneGeometry;
  }
}
