import { Box, Button, Link as MUILink, Typography } from "@mui/material";
import { ErrorBoundary as Boundary } from "react-error-boundary";
import { Link } from "react-router-dom";

const FallbackComponent: React.FC<{ error: any; resetErrorBoundary: any }> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <Typography variant="h5">Looks like something went wrong!</Typography>
      <Box
        sx={{
          width: "80%",
          textAlign: "center",
          color: "red",
          mt: "4px",
          mb: "4px",
        }}
      >
        <Box component="code">{error.message}</Box>
      </Box>
      <Typography variant="body2">
        We track these errors automatically, but if the problem persists feel
        free to <span style={{ cursor: "pointer" }}>contact us</span>. In the
        meantime, try refreshing.
      </Typography>
      <Typography variant="body2" sx={{ my: 1.5 }}>
        If the problem persists, reach us on{" "}
        <MUILink href="mailto:ishitaroyatwork@gmail.com">
          ishitaroyatwork@gmail.com
        </MUILink>
      </Typography>
      <Button onClick={resetErrorBoundary}>Try again</Button>
      <Box sx={{ my: 1.5 }}>OR</Box>
      <Typography variant="body2" sx={{ my: 1.5 }}>
        Go Back to{" "}
        <MUILink component={Link} to="/">
          Home Page
        </MUILink>
      </Typography>
    </Box>
  );
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Boundary FallbackComponent={FallbackComponent}>{children}</Boundary>;
};

export default ErrorBoundary;
