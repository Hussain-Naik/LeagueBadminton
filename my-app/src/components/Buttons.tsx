import * as React from 'react';
import { Button } from "primereact/button";

interface MyButtonProps {
  label: string;
  icon?: string;
  onClick?: ()=> void;
}

const Buttons: React.FC<MyButtonProps> = ({ label, icon, onClick }) => {
  return (
    <div>
      <div className="card flex justify-content-center">
          <Button label={label} icon={icon} onClick={onClick}/>
        </div>
    </div>
  );
};

export default Buttons
