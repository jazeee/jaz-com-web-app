import { Link, AppBar, Toolbar, Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { BaseLink } from "../lib/Links/BaseLink";
import { useReadingFaviconEffect } from "../Readings/useFaviconEffect";

export function AppLayout() {
  useReadingFaviconEffect();
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Container maxWidth="md">
            <Stack direction="row" spacing={2}>
              <Link component={BaseLink} to="/dashboard/values">
                Values
              </Link>
              <Link component={BaseLink} to="/dashboard/graph">
                Graph
              </Link>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
