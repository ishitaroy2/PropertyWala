import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Search,
  BathtubOutlined,
  KingBedOutlined,
  SquareFootOutlined,
} from "@mui/icons-material";
import axios from "axios";

interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
}

export default function PropertyListing() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [page, setPage] = useState(1);
  const propertiesPerPage = 6;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState<
    string | null
  >(null);

  const handleExpandClick = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Property[]>(
        "http://localhost:4000/api/propertylist",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProperties(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to fetch properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setRecommendationsLoading(true);
      const price = localStorage.getItem("preferredPrice") || "1800";
      const area = localStorage.getItem("preferredArea") || "800";
      const response = await axios.post<Property[]>(
        "http://localhost:4000/api/propertyRecommend",
        {
          price: parseInt(price),
          area: parseInt(area),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRecommendations(response.data);
      setRecommendationsError(null);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendationsError(
        "Failed to fetch recommendations. Please try again later."
      );
    } finally {
      setRecommendationsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchRecommendations();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      propertyType === "All" || property.type === propertyType;
    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "0-500000" && property.price <= 500000) ||
      (priceRange === "500001-1000000" &&
        property.price > 500000 &&
        property.price <= 1000000) ||
      (priceRange === "1000001+" && property.price > 1000000);
    return matchesSearch && matchesType && matchesPrice;
  });

  const paginatedProperties = filteredProperties.slice(
    (page - 1) * propertiesPerPage,
    page * propertiesPerPage
  );

  const renderPropertyCard = (property: Property) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={property.image}
        alt={property.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {property.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ mt: 2, mb: 1 }}>
          <Chip
            label={property.type}
            color={property.type === "For Sale" ? "primary" : "secondary"}
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="h6" component="span">
            ${property.price.toLocaleString()}
            {property.type === "For Rent" && "/month"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <KingBedOutlined fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {property.bedrooms} beds
          </Typography>
          <BathtubOutlined fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {property.bathrooms} baths
          </Typography>
          <SquareFootOutlined fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{property.area} sqft</Typography>
        </Box>
      </CardContent>
      <Button
        size="small"
        onClick={() => handleExpandClick(property.id)}
        sx={{ alignSelf: "flex-start", ml: 2, mb: 2 }}
      >
        {expanded === property.id ? "Show Less" : "Learn More"}
      </Button>
      {expanded === property.id && (
        <CardContent>
          <Typography paragraph>{property.description}</Typography>
        </CardContent>
      )}
    </Card>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Property Listings
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Type</InputLabel>
              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as string)}
                label="Type"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="For Sale">For Sale</MenuItem>
                <MenuItem value="For Rent">For Rent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as string)}
                label="Price Range"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="0-500000">$0 - $500,000</MenuItem>
                <MenuItem value="500001-1000000">
                  $500,001 - $1,000,000
                </MenuItem>
                <MenuItem value="1000001+">$1,000,001+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {paginatedProperties.map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4}>
            {renderPropertyCard(property)}
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(filteredProperties.length / propertiesPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Box>

      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recommended Properties
        </Typography>
        {recommendationsLoading ? (
          <CircularProgress />
        ) : recommendationsError ? (
          <Alert severity="error">{recommendationsError}</Alert>
        ) : (
          <Grid container spacing={4}>
            {recommendations.map((property) => (
              <Grid item key={property.id} xs={12} sm={6} md={4}>
                {renderPropertyCard(property)}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
