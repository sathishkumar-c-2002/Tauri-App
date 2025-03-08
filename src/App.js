import './App.css';

import '@mantine/core/styles.css';
import { MantineProvider,AppShell, Text, Burger, ActionIcon, Group ,useMantineTheme} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import { useState } from 'react';
import { createStyles } from '@mantine/emotion';

import { MemoryRouter, NavLink, Route, Routes } from 'react-router-dom';

// import { invoke } from '@tauri-apps/api/tauri'

import Home from './Home';
import Settings from './Settings';


function App() {
  const views = [
    {
      label: 'Home',
      path: '/',
      exact: true,   //optional
      component: Home
    },
    {
      label: 'Settings',
      path: '/settings',
      component: Settings
    },
  ];

  //Mobile nav
  const [opened, setOpened] = useState(false);
  const defaultColorScheme = 'dark';
  console.log(defaultColorScheme);
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);

  //TODO: store to local storage
  const toggleColorScheme = value => {
    const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(newValue);
  }

  const useStyles = createStyles((theme) => ({
    navLink: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      textDecoration: 'none',

      '&:hover': {
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      }
    },
    navLinkActive: {
      backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    }
  }));

  const { classes } = useStyles();
  const theme = useMantineTheme(); 
  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  return (
    <MantineProvider theme={{ colorScheme: colorScheme, fontFamily: 'Open Sans, sans serif' }} withGlobalStyles>
      <MemoryRouter>

        <AppShell padding="md" navbarOffsetBreakpoint='sm' fixed
          navbar={
            <AppShell.Navbar width={{ sm: 200 }} padding="xs" hidden={!opened} hiddenBreakpoint="sm">
              {
                //TODO https://github.com/greena13/react-hotkeys#hotkeys-components
                views.map((view, index) =>
                  <NavLink align="left" to={view.path} key={index} onClick={() => setOpened(false)} className={({ isActive }) => classes.navLink + ' ' + (isActive ? classes.navLinkActive : '')}>
                    {/* TODO : Icons */}
                    <Group><Text>{view.label}</Text></Group>
                  </NavLink>
                )
              }
            </AppShell.Navbar>
          }

          header={
            <AppShell.Header height={70} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                {!isLargeScreen &&
                  (<Burger
                    opened={opened}
                    onClick={() => setOpened(!opened)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />)}


                <Text>Sathish's Tax Filing App</Text>
                <div style={{ marginLeft: "auto" }}>
                  <ActionIcon variant='default' onClick={() => toggleColorScheme()} size={30}>
                    {/* {colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />} */}
                    {colorScheme === 'dark' ? "a" : "b"}
                  </ActionIcon>
                </div>
              </div>
            </AppShell.Header>
          }
          styles={theme => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >

        <Routes>{
          views.map((view, index) => <Route key={index} exact={view.exact} path={view.path} element={<view.component />} />)
        }
        </Routes>
        </AppShell>
      </MemoryRouter>
    </MantineProvider>
  );
}

export default App;
