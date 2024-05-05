import { TextField } from "@mui/material";

export function SettingsForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextField label="Username" autoComplete="username" />
    </form>
  );
}
