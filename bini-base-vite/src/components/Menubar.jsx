import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  rem,
  Stack,
  Title,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
  IconHome2,
  IconLogin,
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconUser,
} from "@tabler/icons-react";

import MantineLogo from "./icons/mantine.svg";

const menuMainLinks = [
  {
    icon: IconHome2,
    label: "Home",
    url: "/",
    subLinks: [
      {
        label: "Home",
        url: "/",
      },
    ],
  },
  {
    icon: IconSettings,
    label: "Admin",
    url: "/admin",
    subLinks: [
      {
        label: "Dashboard",
        url: "/admin/",
      },
      {
        label: "Users",
        url: "/admin/users",
      },
      {
        label: "Roles",
        url: "/admin/roles",
      },
      {
        label: "Teams",
        url: "/admin/teams",
      },
    ],
  },
  {
    icon: IconUser,
    label: "User",
    url: "/user",
    subLinks: [
      {
        label: "Home",
        url: "/user",
      },
    ],
  },
];

const loginLink = {
  icon: IconLogin,
  label: "Login",
  url: "/login",
  subLinks: [],
};

export default function Menubar({
  currentUser,
  colorScheme,
  toggleColorScheme,
}) {
  const { classes, cx } = useStyles();
  const [activeMainLink, setActiveMainLink] = useState(menuMainLinks[0]);

  return (
    <Navbar height="100%" width={{ sm: 300 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            <img src={MantineLogo} alt="Logo" style={{ width: 30 }} />
          </div>
          <Stack justify="space-between" style={{ height: "100%" }}>
            <Stack spacing="xs">
              {menuMainLinks.map((link) => (
                <MainLink
                  label={link.label}
                  icon={link.icon}
                  key={link.label}
                  url={link.url}
                  onLinkActivation={() => {
                    setActiveMainLink(link);
                  }}
                ></MainLink>
              ))}
            </Stack>
            <Stack spacing="xs" style={{ marginBottom: 20 }}>
              <Tooltip
                label={colorScheme === "dark" ? "Light mode" : "Dark mode"}
                position="right"
                withArrow
                transitionProps={{ duration: 0 }}
              >
                <UnstyledButton
                  className={cx(classes.mainLink)}
                  onClick={() => toggleColorScheme()}
                >
                  {colorScheme === "dark" ? (
                    <IconSun size="1.4rem" stroke={1.5} />
                  ) : (
                    <IconMoonStars size="1.4rem" stroke={1.5} />
                  )}
                </UnstyledButton>
              </Tooltip>
              {currentUser && (
                <MainLink icon={IconLogout} label="Logout" url="/logout" />
              )}
              {!currentUser && (
                <MainLink
                  icon={loginLink.icon}
                  label={loginLink.label}
                  url={loginLink.url}
                  onLinkActivation={() => setActiveMainLink(loginLink)}
                />
              )}
            </Stack>
          </Stack>
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {activeMainLink.label}
          </Title>
          {activeMainLink.subLinks.map((link) => (
            <SubLink label={link.label} url={link.url} key={link.url} />
          ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}

function MainLink({ label, icon: Icon, url, onLinkActivation }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip
      label={label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={label}
    >
      <RouterNavLink to={url}>
        {({ isActive }) => {
          useEffect(() => {
            if (isActive && onLinkActivation) {
              onLinkActivation();
            }
          }, [isActive]);

          return (
            <UnstyledButton
              className={cx(classes.mainLink, {
                [classes.mainLinkActive]: isActive,
              })}
            >
              <Icon size="1.4rem" stroke={1.5} />
            </UnstyledButton>
          );
        }}
      </RouterNavLink>
    </Tooltip>
  );
}

function SubLink({ label, url }) {
  const { classes, cx } = useStyles();

  return (
    <RouterNavLink
      to={url}
      className={({ isActive }) =>
        cx(classes.link, {
          [classes.linkActive]: isActive,
        })
      }
    >
      {label}
    </RouterNavLink>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: `0 0 ${rem(60)}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  mainLink: {
    width: rem(44),
    height: rem(44),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: rem(18),
    height: rem(60),
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },
}));
