import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router";

interface CreateProps {
    visible: boolean;
    setVisible: () => void;
}

const CreateLeague: React.FC<CreateProps> = ({ visible, setVisible }) => {
  const [iName, setIName] = useState<string>("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    const postObject = {
      1: { sheetname: "LEAGUE", name: iName },
    };
    const jObj = JSON.stringify(postObject);
    try {
      const post = await axiosReq.post(`/exec?post=${jObj}`);
      const leagueObject = { title: "League", count: 4, ...post.data.data[0] };
      await axiosAPI.post(
        `/exec?e=SESSIONS&q=${leagueObject.id}&f=league`
      );
      setVisible();
      navigate("league/");
    } catch (error) {}
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIName(event.target.value);
  };

  return (
    <div>
      <Dialog
        visible={visible}
        modal
        onHide={() => {
          if (!visible) return;
          setVisible();
        }}
        content={({ hide }) => (
          <div
            className="flex flex-column px-8 py-5 gap-4"
            style={{
              borderRadius: "12px",
              backgroundImage:
                "radial-gradient(circle at left top, var(--primary-400), var(--primary-700))",
            }}
          >
            <div className="inline-flex flex-column gap-2">
              <FloatLabel>
                <InputText
                  value={iName}
                  onChange={handleChange}
                  // label="Name"
                  name="name"
                  className="bg-white-alpha-20 border-none p-3 text-primary-50"
                ></InputText>
                <label
                  htmlFor="name"
                  className="text-primary-50 font-semibold capitalize"
                >
                  League Name
                </label>
              </FloatLabel>
            </div>
            <div className="flex align-items-center gap-2">
              <Button
                label="Submit"
                onClick={() => handleSubmit()}
                text
                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              ></Button>
              <Button
                label="Cancel"
                onClick={(e) => hide(e)}
                text
                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              ></Button>
            </div>
          </div>
        )}
      ></Dialog>
    </div>
  );
};

export default CreateLeague;
