import Intro from "./Intro";
import Description from "./Description";
import Bubbles from "../../../components/Bubbles";

import { directions } from "../constants";

export const HomeContainer = () => {
  return (
    <>
      <Intro />
      <Description />
      <Bubbles clickable={true} content={directions} />
    </>
  );
};
