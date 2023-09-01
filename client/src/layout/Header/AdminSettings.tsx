import { AnimatePresence, motion } from "framer-motion";

import { v4 as uuid } from "uuid";
import { IoMdSettings } from "react-icons/io";

import Switch from "../../components/Switch";

import "./AdminSettings.scss";
import {
  useGetSettingsAllQuery,
  useModifySettingMutation,
} from "../../api/services/settings";
import { useState } from "react";

const AdminSettings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = useGetSettingsAllQuery();

  const [modify] = useModifySettingMutation();

  if (!data) return null;

  return (
    <div className="adm-settings-nav">
      <IoMdSettings
        size={25}
        color="#008000"
        onClick={() => setIsOpen((open) => !open)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="adm-settings-nav__select"
            key={"adm-settings-nav__select"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data.map(({ setting, mode }: any) => {
              return (
                <div key={uuid()} className="adm-settings-nav__option">
                  <Switch
                    title={setting}
                    isOn={!!mode}
                    handleSwitch={() => modify({ setting })}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSettings;
