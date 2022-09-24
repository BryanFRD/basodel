import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import { UserContext } from '../../../../../../context/UserContext';

const ChatMessage = ({message}) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  
  const handleBlockUser = () => {
    console.log(`Blocked: ${JSON.stringify(message)}`);
  }
  
  const handleReportUser = () => {
    console.log(`Reported: ${JSON.stringify(message)}`);
  }
  
  return (
    <div className={`chat-message-container ${theme.chat} ${message.userAccountId === user.id ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message d-flex flex-column`}>
        <Dropdown>
          <Dropdown.Toggle variant={theme.variant} className={`chat-username m-0 p-0 mb-2`}>{message.username}</Dropdown.Toggle>
          <Dropdown.Menu variant={theme.variant}>
            <Dropdown.ItemText>{message.username}</Dropdown.ItemText>
            {user && <>
              <Dropdown.Divider />
              <Dropdown.Item className={theme.textDanger} onClick={handleBlockUser}>
                {t('chat.blockUser')}
              </Dropdown.Item>
              <Dropdown.Item className={theme.textDanger} onClick={handleReportUser}>
                {t('chat.reportUser')}
              </Dropdown.Item>
            </>}
          </Dropdown.Menu>
        </Dropdown>
        {/* <GenerikLink className={`chat-username mb-2`}>Bernard</GenerikLink> */}
        <span>{message.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;