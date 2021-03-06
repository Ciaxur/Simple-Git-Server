import React from 'react';
import { RepoActions, RootStoreContext } from '../../Store/RootStore';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  makeStyles, fade,
} from '@material-ui/core';
import { MenuOutlined, SearchOutlined } from '@material-ui/icons';

// Style & Component Imports
import { ColorPalette } from '../../Styles';
import URLRouteBreadcrumb from './URLRouteBreadcrumb';

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: ColorPalette.greyPrimary,
    color: ColorPalette.whiteFont,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




interface Props {
  onMenuToggle: () => void,
}

function HeaderMenu(props: Props) {
  // Hooks
  const styles = useStyles();
  const { store, dispatch } = React.useContext(RootStoreContext);

  // Callbacks
  const onSearch = (strInput: string) => {
    // Destructure for readability
    const { repoList } = store.repoStore;
    RepoActions.filterSearchState(strInput, repoList, dispatch);
  };
  
  return (
    <div className={styles.container}>
      <AppBar className={styles.bar} position="static">
        <Toolbar>
          <IconButton
            className={styles.menuButton}
            edge="start"
            color="inherit"
            onClick={props.onMenuToggle}
          >
            <MenuOutlined />
          </IconButton>

          <Typography className={styles.title} variant="h6">
            GitServer.docker
          </Typography>

          <URLRouteBreadcrumb style={{
            marginLeft: '40px',
            flex: 1,
          }}/>

          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchOutlined />
            </div>
            <InputBase
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default HeaderMenu;
