import { v4 as uuid } from "uuid";

import "./CateringIntro.scss";

const introArticles: string[] = [
  "Planning of the event may be tricky and stressful. Different occasions require different styles of meals and it might be hard to guess what you might need and how much food you have to order.",
  "Babushka Market is happy to help you with that. We will be glad to tailor custom menu for your event, count ideal portion size and listen to all your needs. Feel free to contact us if you have any questions. We are able to accommodate almost every dietary restrictions.",
  "We also can provide full service on site with chefs and servers.",
];

const CateringIntro = () => {
  return (
    <div className="catering__descr__intro">
      <div className="catering__descr__intro__text">
        <div className="catering__descr__intro__header">
          <h1>We are here to help you</h1>
        </div>
        <div className="catering__descr__intro__body">
          {introArticles.map((text: string, index: number) => {
            return (
              <p key={uuid()} style={{ animationDelay: `${200 * index}ms` }}>
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CateringIntro;
