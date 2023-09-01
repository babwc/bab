import { useState, useEffect, useRef } from "react";

import { useGetSettingDataQuery } from "../../api/services/settings";

import Button from "../../components/Button";

import "./Reserve.scss";

import { Settings } from "../../ts/types";

const Reserve = () => {
  const [reservationOpen, setReservationOpen] = useState<boolean>(false);

  const { data: reservsData } = useGetSettingDataQuery(Settings.Reservations);

  const ref = useRef<any>();

  const handleReserv = () => {
    setReservationOpen(!reservationOpen);
  };

  useEffect(() => {
    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "//www.opentable.com/widget/reservation/loader?rid=1285345&type=standard&theme=standard&color=1&dark=true&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website";
      script.async = true;

      ref.current.appendChild(script);
    }
  }, [reservsData]);

  if (!reservsData) return null;

  return reservsData.mode ? (
    <div className="reserve">
      <Button handleClick={handleReserv}>Reserve</Button>
      <div className={`reserve__popup ${reservationOpen ? "open" : ""}`}>
        <div className="reserve__widget__wrap">
          <div ref={ref} className="reserve__widget" />
        </div>
      </div>
    </div>
  ) : null;
};

export default Reserve;
