import { WhaleScene } from "@/components/whale";

import { StarScene } from "@/components/scene/scene";
import { ClearGlass } from "@/components/clear-glass/ClearGlass";
import { Card } from "@/components/Card";
import { CardCustomImage } from "@/components/3d-card/card-custom-image";
import Earth from "../earth";
import { HologramBusinessCard } from "../3d-card/hologram-card";

export const experiments = [
  {
    id: 1,
    key: "earth",
    title: "Earth",
    content: <Earth />,
    thumbnailImg: "/images/thumbnail/earth.png",
  },
  {
    id: 2,
    key: "gsap-whale",
    title: "GSAP scroll with 3D model",
    content: <WhaleScene />,
    thumbnailImg: "/images/thumbnail/whale.png",
  },
  {
    id: 3,
    key: "zoom-space",
    title: "Infinite zoom Space",
    content: <StarScene />,
    thumbnailImg: "/images/thumbnail/zoom-space.png",
  },
  {
    id: 4,
    key: "card-with-image",
    title: "3D card with custom image",
    content: <CardCustomImage />,
    thumbnailImg: "/images/thumbnail/card-with-image.png",
  },
  {
    id: 5,
    key: "glass",
    title: "Clear texture with text",
    content: <ClearGlass />,
    thumbnailImg: "/images/thumbnail/clear-glass.png",
  },
  {
    id: 6,
    key: "hologram-card",
    title: "Hologram business card",
    content: <HologramBusinessCard />,
    thumbnailImg: "/images/thumbnail/hologram-card.png",
  },
];
