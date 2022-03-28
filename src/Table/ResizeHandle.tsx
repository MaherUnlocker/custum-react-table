import React, { ReactElement } from 'react';

import { ColumnInstance } from 'react-table';
import cx from 'classnames';
import { useStyles } from './TableStyle';

export const ResizeHandle = <T extends Record<string, unknown>>({
  column,
}: {
  column: ColumnInstance<T>;
}): ReactElement => {
  const classes = useStyles();
  return (
    <div
      {...column.getResizerProps()}
      style={{ cursor: 'col-resize' }} // override the useResizeColumns default
      className={cx({
        [classes.resizeHandle]: true,
        handleActive: column.isResizing,
      })}
    />
  );
};
