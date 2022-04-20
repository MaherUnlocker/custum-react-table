import { Button, IconButton, Theme, Toolbar, Tooltip } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

import { ColumnHidePage } from './ColumnHidePage';
import GlobalFilter from './filters/GlobalFilter';
import React from 'react';
import { StyledButton } from '../components/assets/StyledButton';
import { TableInstance } from 'react-table';
import { TableMouseEventHandler } from '../../types/react-table-config';
import ViewColumnsIcon from '@mui/icons-material/ViewColumn';
import classnames from 'classnames';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftButtons: {},
    rightButtons: {},
    leftIcons: {
      '&:first-of-type': {
        marginLeft: -12,
      },
    },
    rightIcons: {
      padding: 12,
      marginTop: '-6px',
      width: 48,
      height: 48,
      '&:last-of-type': {
        marginRight: -12,
      },
    },
  })
);

type InstanceActionButton<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  icon?: JSX.Element;
  onClick: TableMouseEventHandler;
  enabled?: (instance: TableInstance<T>) => boolean;
  label: string;
  variant?: 'right' | 'left';
};

type ActionButton = {
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler;
  enabled?: boolean;
  label: string;
  variant?: 'right' | 'left';
};

export const InstanceLabeledActionButton = <T extends Record<string, unknown>>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): React.ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick(instance)}
    disabled={!enabled(instance)}
  >
    {icon}
    {label}
  </Button>
);

export const LabeledActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton): React.ReactElement => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={!enabled}
  >
    {icon}
    {label}
  </Button>
);

export const InstanceSmallIconActionButton = <
  T extends Record<string, unknown>
>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>): React.ReactElement => {
  const classes = useStyles({});
  return (
    <Tooltip title={label !== '' ? label : ' '} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === 'right',
            [classes.leftIcons]: variant === 'left',
          })}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
          size="large"
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export const SmallIconActionButton = ({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton): React.ReactElement => {
  const classes = useStyles({});
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({
            [classes.rightIcons]: variant === 'right',
            [classes.leftIcons]: variant === 'left',
          })}
          onClick={onClick}
          disabled={!enabled}
          size="large"
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>;
  onAdd?: TableMouseEventHandler;
  onDelete?: TableMouseEventHandler;
  onEdit?: TableMouseEventHandler;
  showGlobalFilter?: boolean;
  showFilter?: boolean;
  showColumnIcon?: boolean;
  filterActive?: boolean;
  setLocalFilterActive?:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  customJsxSideFilterButton?: React.ReactNode;
};

export function TableToolbar<T extends Record<string, unknown>>({
  instance,
  showGlobalFilter,
  showFilter,
  showColumnIcon,
  filterActive,
  setLocalFilterActive,
  customJsxSideFilterButton,
}: React.PropsWithChildren<TableToolbarProps<T>>): React.ReactElement | null {
  const { columns } = instance;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>(
    undefined
  );
  const [columnsOpen, setColumnsOpen] = React.useState(false);
  const [, setFilterOpen] = React.useState(false);

  const hideableColumns = columns.filter(
    (column) => !(column.id === '_selector')
  );

  const handleColumnsClick = React.useCallback(
    (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
      setColumnsOpen(true);
    },
    [setAnchorEl, setColumnsOpen]
  );

  const handleClose = React.useCallback(() => {
    setColumnsOpen(false);
    setFilterOpen(false);
    setAnchorEl(undefined);
  }, []);

  // toolbar with  filter/search column select.

  return (
    <Toolbar
      className={
        !showGlobalFilter && !showFilter && !showColumnIcon
          ? 'd-none'
          : classes.toolbar
      }
    >
      {showGlobalFilter ? (
        <GlobalFilter
          preGlobalFilteredRows={instance.preGlobalFilteredRows}
          setGlobalFilter={instance.setGlobalFilter}
        />
      ) : null}

      <div
        className={classes.rightButtons}
        style={{ display: 'flex', alignItems: 'center', height: '25' }}
      >
        <ColumnHidePage<T>
          instance={instance}
          onClose={handleClose}
          show={columnsOpen}
          anchorEl={anchorEl}
        />

        {showColumnIcon
          ? hideableColumns.length > 1 && (
              <SmallIconActionButton
                icon={<ViewColumnsIcon />}
                onClick={handleColumnsClick}
                label="Show / hide columns"
                variant="right"
              />
            )
          : null}
        {showFilter ? (
          <React.Fragment>
            <StyledButton
              rounded
              variant="primary"
              onClick={() => {
                setLocalFilterActive!(!filterActive);
              }}
              label="Filter by columns"
            >
              Filtre(s)
            </StyledButton>
          </React.Fragment>
        ) : null}
        {customJsxSideFilterButton}
      </div>
    </Toolbar>
  );
}
