import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { BaseError } from 'viem'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'

const wallets = ['metamask', 'injected'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (connector: Connector<any, any>) => {
    connect({connector : connector});
    onClose(connector.name);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose wallet</DialogTitle>
      <List sx={{ pt: 0 }}>
        {connectors
        .filter( x => x.ready && x.id !== connector?.id)
        .map((connector) => (
          <ListItem disableGutters key={connector.name}>
            <ListItemButton onClick={() => handleListItemClick(connector)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={connector.name} />
              <ListItemText primary={isLoading && connector.id === pendingConnector?.id && ' (Connecting)'} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export function ConnectDialog() {
  const { connector, isConnected } = useAccount();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const { disconnect }= useDisconnect();

  return (
    <div>
      <Button variant="contained" disableElevation onClick={isConnected ? () => disconnect() : handleClickOpen}>
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
      <SimpleDialog
        selectedValue={connector?.name ?? ""}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}