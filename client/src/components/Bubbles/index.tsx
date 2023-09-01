import { useNavigate } from "react-router-dom";

import "./styles.scss";

interface Content {
  title: string;
  image: string;
  description: string;
  page: string;
  passTitle?: boolean;
}

const Bubbles = ({
  clickable = false,
  content,
}: {
  clickable: boolean;
  content: Content[];
}) => {
  const navigate = useNavigate();

  return (
    <div className="bubbles">
      <div className="bubbles__body">
        {content.map(
          ({ title, image, description, page, passTitle }, i: number) => {
            return (
              <div
                key={i}
                className="bubbles__details"
                onClick={
                  clickable
                    ? () =>
                        navigate(
                          `/${page}`,
                          passTitle ? { state: { title } } : {}
                        )
                    : undefined
                }
              >
                <img
                  src={require(`../../assets/images/${image}`)}
                  alt={title}
                />
                <div className="bubbles_details__title">
                  <h1>{title}</h1>
                </div>
                <div className="bubbles__details__shadow">
                  {description ? <p>{description}</p> : null}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Bubbles;
