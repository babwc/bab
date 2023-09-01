import { useState, useEffect } from "react";

import { useGetProductsQuery } from "../../../api/services/products";

import ContainerDetails from "./ContainerDetails";
import ProductDetails from "../shared/ProductDetails";
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import Protected from "../../../components/Protected";

import "./ProductList.scss";

import { IContainer, IProduct } from "../../../ts/interfaces";

const limit = 9;

const ProductList = ({
  searchValue,
  department,
}: {
  searchValue: string;
  department: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetProductsQuery(
    { searchValue, department, limit, currentPage },
    {
      skip: !department,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) {
    return <Loading pageLoading={true} />;
  }

  return data ? (
    <>
      <div className="product-list">
        {data.products.map((product: IProduct | IContainer) => {
          return product.isContainer ? (
            product.modifiers?.length ? (
              <ContainerDetails key={product._id} product={product} />
            ) : (
              <Protected key={product._id} requiredRoles={["admin"]}>
                <ContainerDetails product={product} emptyContainer={true} />
              </Protected>
            )
          ) : (
            <ProductDetails key={product._id} product={product} />
          );
        })}
      </div>
      {data.total > limit ? (
        <Pagination
          limit={limit}
          total={data.total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  ) : null;
};

export default ProductList;
