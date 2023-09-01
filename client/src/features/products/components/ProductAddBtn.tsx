import Button from "../../../components/Button";

const ProductAddBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div style={{ paddingBottom: "10px", boxSizing: "border-box" }}>
      <Button handleClick={handleClick}>Add a product</Button>
    </div>
  );
};

export default ProductAddBtn;
