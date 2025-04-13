import { useParams } from "react-router";

export const About = () => {
    const {text} = useParams();
  return (
    <h1>About - {text}</h1>
  )
}
