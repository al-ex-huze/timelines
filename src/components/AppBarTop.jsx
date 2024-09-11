import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import SwipeDownAltIcon from "@mui/icons-material/SwipeDownAlt";

const pages = ["Timelines", "Calendar", "Blog"];
const settings = ["Profile", "Account", "Logout"];

const AppBarTop = ({
    forceMobile,
    setForceMobile,
    openMobileBottom,
    handleBottomDrawerClose,
    handleBottomDrawerOpen,
}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleForceMobile = () => {
        setForceMobile(!forceMobile);
    };

    return (
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    >
                        <img
                            src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/ah3fff.png"
                            height={25}
                            width={25}
                        />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        HUZE VIEWS
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <IconButton
                        sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
                    >
                        <img
                            src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/ah3fff.png"
                            height={25}
                            width={25}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        HUZE VIEWS
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, display: "flex" }}>
                        {forceMobile ? (
                            <>
                                <Tooltip title="Simulate Swipe">
                                    {openMobileBottom ? (
                                        <IconButton
                                            onClick={handleBottomDrawerClose}
                                        >
                                            <SwipeDownAltIcon
                                                height={25}
                                                width={25}
                                            />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={handleBottomDrawerOpen}
                                        >
                                            <SwipeUpAltIcon
                                                height={25}
                                                width={25}
                                            />
                                        </IconButton>
                                    )}
                                </Tooltip>
                                <Tooltip title="Force Mobile/Desktop">
                                    <IconButton
                                        onClick={handleForceMobile}
                                        sx={{
                                            mr: 1,
                                        }}
                                    >
                                        <PersonalVideoIcon
                                            height={25}
                                            width={25}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <Tooltip title="Force Mobile/Desktop">
                                <IconButton
                                    onClick={handleForceMobile}
                                    sx={{
                                        mr: 1,
                                    }}
                                >
                                    <PhoneAndroidIcon height={25} width={25} />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Profile Settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Alex Hughes"
                                    src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/ah-hs-1.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography sx={{ textAlign: "center" }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default AppBarTop;
