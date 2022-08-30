import React from "react";
import { Button as InternalButton, CircularProgress } from "@mui/material";

export enum ButtonState {
  Primary = "Primary",
  Loading = "Loading",
}

interface ButtonProps {
  readonly buttonState: ButtonState;
  readonly onClick: (idForm: number) => void;
  readonly label: string;
  readonly idForm: number
}

export const Button: React.FC<ButtonProps> = ({
  buttonState,
  onClick,
  label,
  idForm
}) => {
  const isLoading = buttonState === ButtonState.Loading;
  return (
    <div className="d-flex justify-content-center mt-5">
      <InternalButton onClick={() => onClick(idForm)} variant="contained" size="small">
        {isLoading && (
          <CircularProgress
            role="status"
            aria-hidden="true"
          />
        )}
        {!isLoading && label}
      </InternalButton>
    </div>
  );
};