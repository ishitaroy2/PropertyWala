import {
  Typography,
  Container,
  Box,
  Link,
} from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: 'auto', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
            © 2024 PlagiarismAI. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1, color: 'text.secondary' }}>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
          </Typography>
        </Container>
      </Box>
    );
    }

export default Footer;