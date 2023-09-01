// import { ChangeEvent, useState } from "react";

// import { AiOutlinePlusCircle } from "react-icons/ai";

// import { useAddCategoryMutation } from "../../../../../api/services/cateringCtg";

// import Input from "../../../../../components/Input";

// import "./CateringCategoryAdd.scss";

// const CateringCategoryAdd = () => {
//   const [newCtgName, setNewCtgName] = useState<string>("");
//   const [error, setError] = useState("");

//   const [addCategory] = useAddCategoryMutation();

//   const handleClick = () => {
//     if (newCtgName.length) {
//       addCategory({ name: newCtgName })
//         .unwrap()
//         .then(() => {
//           setNewCtgName("");
//         })
//         .catch((err) => setError(err.data));
//     }
//   };

//   return (
//     <div className="catering-ctg__add">
//       <Input
//         label="Add new category"
//         error={error}
//         value={newCtgName}
//         handleChange={(e: ChangeEvent<HTMLInputElement>) =>
//           setNewCtgName(e.target.value)
//         }
//       />
//       <div className="catering-ctg__add__btn" onClick={handleClick}>
//         <AiOutlinePlusCircle size={25} color={"#008000"} />
//       </div>
//     </div>
//   );
// };

// export default CateringCategoryAdd;
export default {};
