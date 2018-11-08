import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ReplyIcon from '@material-ui/icons/Reply';
// import EyeIcon from '@material-ui/icons/RemoveRedEye';
import { withStyles, Theme } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {chatTime} from "../../utils";
import { Link } from "react-router-dom";
import {endpoint} from "../../api";

const styles = (theme: Theme) => ({
  paperHeading: {
    padding: '15px 10px 15px 20px',
    borderBottom: '1px solid #dee2e6',
    fontSize: '17px',
    lineHeight: '20px',
    color: '#000',
  },
  paperContent: {
    padding: '5px 10px',
  },
  messagesList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  messagesItem: {
    padding: '15px 10px',
    display: 'flex',
    alignItems: 'flex-start',
    borderBottom: '1px solid #dee2e6',
    '&:last-child': {
      borderBottom: 'none',
    }
  },
  avatar: {
    width: '40px',
    height: '40px',
    marginRight: '15px',
  },
  badge: {
    left: '-5px',
    top: '-5px',
    width: '16px',
    height: '16px',
    fontSize: '10px',
    lineHeight: '16px',
  },
  messageContent: {
    flex: 1,
  },
  messageInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageAuthor: {
    fontSize: '13px',
    lineHeight: '18px',
    color: '#3f51b5',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  messageTime: {
    fontSize: '12px',
    lineHeight: '14px',
    color: '#6c757d',
    display: 'inline-block',
  },
  messageText: {
    fontSize: '11px',
    marginBottom: '6px',
    color: '#6c757d',
  },
  button: {
    fontSize: '11px',
    lineHeight: '13px',
    padding: 0,
    'text-transform': 'none',
    minWidth: '50px',
    minHeight: '23px',
    color: '#6c757d',
    marginRight: '5px',
  },
  icon: {
    fontSize: 11,
    color: '#6c757d',
  },
  link: {
    textDecoration: 'none'
  }
});

class HeaderMessages extends React.Component<any> {

  render() {
    const { contactsList, classes } = this.props;
    const filteredContacts = contactsList.filter((chat:any) => chat.newMessages > 0);

  const messages = filteredContacts.map((contact:any) => {
    return (
      <li key={contact.chatId} className={classes.messagesItem}>
        <div className={classes.avatar}>
          {contact.newMessages >= '1' ?
            <Badge color="secondary" badgeContent={contact.newMessages} classes={{ badge: classes.badge }}>
              <Avatar src={contact.parnter.avatar ? `${endpoint}/images/${contact.parnter.id}/${contact.parnter.avatar}` : "profile.jpeg"} />
            </Badge> :
            <Avatar src={contact.parnter.avatar ? `${endpoint}/images/${contact.parnter.id}/${contact.parnter.avatar}` : "profile.jpeg"} />
          }
        </div>

        <div className={classes.messageContent}>
          <div className={classes.messageInfo}>
            <a className={classes.messageAuthor} href={contact.authorLink}>{contact.parnter.name}</a>
            <div className={classes.messageTime}>
              <small>{chatTime(contact.lastMessage.date)}</small>
            </div>
          </div>

          <Typography className={classes.messageText}>{contact.lastMessage.content.length > 25 ? contact.lastMessage.content.substring(0,25) + "..." : contact.lastMessage.content}</Typography>

          <Link className={classes.link} to={{ pathname: "/messages", state: { user: contact } }}>
              <Button variant="flat" size="small" className={classes.button}>
                  <ReplyIcon className={classes.icon} />
                  Reply
              </Button>
          </Link>
          {/*<Button variant="flat" size="small" className={classes.button}>*/}
            {/*<EyeIcon className={classes.icon} />*/}
            {/*Read*/}
          {/*</Button>*/}
        </div>
      </li>
    )
  });

    return (
      <>
        <ul className={classes.messagesList}>
          {messages.length > 0 ? messages : `No new messages`}
        </ul>
      </>
    );
  }
}

const mapStateToProps = ({auth, chat}:any) => {
    return {
        contactsList: chat.contactsList,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(HeaderMessages));