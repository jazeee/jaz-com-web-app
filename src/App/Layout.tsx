import { Link, AppBar, Toolbar, Typography, Container } from "@mui/material";
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
            <Typography>
              <Link component={BaseLink} to="/dashboard/values">
                Values
              </Link>
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
