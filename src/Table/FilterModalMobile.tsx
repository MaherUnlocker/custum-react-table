import { FilterIcon, StyledH2 } from '@aureskonnect/react-ui';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { Box } from '@mui/material';
import { FilterPageCustom } from './FilterPageCustom';
import React from 'react';
import { useStyles } from './TableStyle';

type FilterModalMobileProps = {
  instance: any;
  onClose?: () => void;
  setLocalFilterActive: any;
  filterActive?: boolean;
};

export default function FilterModalMobile({
  instance,
  filterActive,
  setLocalFilterActive,
}: FilterModalMobileProps): JSX.Element {
  const classes = useStyles();
  return (
    <Modal
      toggle={() => setLocalFilterActive(!filterActive)}
      isOpen={filterActive}
      style={{ margin: '0 ', padding: '0 ', height: '100%' }}
      scrollable
    >
      <ModalHeader className='text-capitalize' toggle={() => setLocalFilterActive(!filterActive)}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FilterIcon className={classes.tableFilterAltOutlinedIcon} style={{ flexDirection: 'row-reverse' }} />
          <StyledH2>Filtre(s)</StyledH2>
        </Box>
      </ModalHeader>
      <ModalBody style={{ margin: '0 ', padding: '0 ', height: '100%' }}>
        <FilterPageCustom instance={instance} setLocalFilterActive={setLocalFilterActive} filterActive={filterActive} />
      </ModalBody>
    </Modal>
  );
}
