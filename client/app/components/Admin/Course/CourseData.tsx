import { styles } from "@/app/styles/styles";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
type Props = {
  benifits: { title: string }[];
  setBenifits: (benifits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benifits,
  setBenifits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenifitChange = (index: number, value: any) => {
    const updatedBenifits = [...benifits];
    updatedBenifits[index].title = value;
    setBenifits(updatedBenifits);
  };

  const handleAddBenifits = () => {
    setBenifits([...benifits, { title: "" }]);
  };

  const handlePrequisitesChange = (index: number, value: any) => {
    const updatedPrequisites = [...prerequisites];
    updatedPrequisites[index].title = value;
    setPrerequisites(updatedPrequisites);
  };

  const handleAddPrequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benifits[benifits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please Fill the Fields for Go Next!");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label}`}>
          What are the benifits for the students in this course
        </label>
        <br />
        {benifits.map((benifit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benifits"
            placeholder="You will be able to crack startups..."
            required
            className={`${styles.input} `}
            value={benifit.title}
            onChange={(e: any) => handleBenifitChange(index, e.target.value)}
          />
        ))}

        <AddCircleIcon
          className="dark:text-white text-black"
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenifits}
        />
      </div>

      <div>
        <label className={`${styles.label}`}>
          What are the prerequisites for the students in this course
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You have basic knowledge of html, css, js"
            required
            className={`${styles.input} `}
            value={prerequisite.title}
            onChange={(e: any) =>
              handlePrequisitesChange(index, e.target.value)
            }
          />
        ))}

        <AddCircleIcon
          className="dark:text-white text-black"
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className={`${styles.button} mr-3`} onClick={() => prevButton()}>
          Prev
        </div>
        <div className={`${styles.button}`} onClick={() => handleOptions()}>
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseData;
