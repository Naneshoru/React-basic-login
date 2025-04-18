import React, { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { Input } from "./input";
import '@styles/input.css'

const PasswordInput: React.FC<any> = ({ ...props }: any) => {
  const [isLocked, setIsLocked] = useState(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
      <Input 
        {...props} 
        type={isLocked ? 'password' : 'text'} 
        icon={
          <span className="lock-icon" onClick={toggleLock}>
            {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
          </span>
        }
      />
  );
};

export default PasswordInput;