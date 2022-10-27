import React, { useContext, useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../../../context/ThemeContext';
import { UserContext } from '../../../../../../context/UserContext';

const ChatMessage = ({message}) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { user, updateUser } = useContext(UserContext);
  const blockedUser = useMemo(() => {
    const index = user?.getBlockedUserIndex(message.userAccountId);
    
    return {index, blocked: index !== -1 && user}
  }, [user, message.userAccountId]);
  
  const handleBlockUser = () => {
    if(blockedUser.blocked)
      user.blockedUser.splice(blockedUser.index, 1);
    else
      user.blockedUser.push({id: message.userAccountId})
      
    updateUser(true);
  }
  
  const handleReportUser = () => {
    console.log(`Reported: ${JSON.stringify(message)}`);
  }
  
  return (
    <div className={`chat-message-container ${theme.chat} ${message.userAccountId === user?.id ? 'message-sender' : 'message-receiver'}`}>
      <div className={`chat-message d-flex flex-column`}>
        <Dropdown>
          <Dropdown.Toggle variant={theme.variant} className={`chat-username m-0 p-0 mb-2`}>
            {blockedUser.blocked ? t('chat.userBlocked') : message.username}
          </Dropdown.Toggle>
          {user &&
            <Dropdown.Menu variant={theme.variant}>
              <Dropdown.ItemText>{blockedUser.blocked ? t('chat.userBlocked') : message.username}</Dropdown.ItemText>
              {user.id !== message.userAccountId && <>
                <Dropdown.Divider />
                <Dropdown.Item className={theme.textDanger} onClick={handleBlockUser}>
                  {t(blockedUser.blocked ? 'chat.unblockUser' : 'chat.blockUser')}
                </Dropdown.Item>
                <Dropdown.Item className={`${theme.textDanger} text-decoration-line-through`} onClick={handleReportUser} disabled>
                  {t('chat.reportUser')}
                </Dropdown.Item>
              </>}
            </Dropdown.Menu>  
          }
        </Dropdown>
        <span className={`${blockedUser.blocked ? 'text-muted' : ''}`}>{blockedUser.blocked ? t('chat.messageBlocked') : message.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;