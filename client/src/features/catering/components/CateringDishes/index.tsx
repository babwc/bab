import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import CateringDishAdd from "./CateringDishAdd";
import CateringDishNew from "./CateringDishNew";
import CateringDishesHeader from "./CateringDishesHeader";
import CateringDishesList from "./CateringDishesList";

import Protected from "../../../../components/Protected";
import Loading from "../../../../components/Loading";

import { useGetCateringListQuery } from "../../../../api/services/catering";

import { categories } from "./constants";

const CateringDishes = () => {
  const [newDishOpen, setNewDishOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>(categories[0]);

  const { data, isLoading } = useGetCateringListQuery(currentCategory);

  const handleCurrentCtg = (ctg: string) => {
    setCurrentCategory(ctg);
  };

  const closeModal = () => setNewDishOpen(!newDishOpen);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AnimatePresence>
        {newDishOpen && <CateringDishNew closeModal={closeModal} />}
      </AnimatePresence>
      <Protected requiredRoles={["admin"]}>
        <CateringDishAdd setNewDishOpen={setNewDishOpen} />
      </Protected>
      {data ? (
        <>
          <CateringDishesHeader
            categories={categories}
            currentCategory={currentCategory!}
            handleCurrentCtg={handleCurrentCtg}
          />
          <CateringDishesList cateringDishes={data!} />
        </>
      ) : null}
    </>
  );
};

export default CateringDishes;
