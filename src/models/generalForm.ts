export type EmailFrequency = 'DAILY' | 'WEEKLY'

export type FormType = {
  conversationDownloadsEnabled: boolean,
  conversationClearEnabled: boolean,
  collectUserInfoEnabled: boolean,
  showLiveChatIcon: boolean,
  emailEnabled: boolean,
  emailAddress: string,
  emailFrequency: EmailFrequency
  initMessage: false
}

export type FormResponseType = {
  conversationDownloadsEnabled: boolean,
  conversationClearEnabled: boolean,
  collectUserInfoEnabled: boolean,
  showLiveChatIcon: boolean,
  conversationTranscripts: {
    emailEnabled: boolean,
    emailAddress: string,
    emailFrequency: EmailFrequency
  }
  initMessage: false
}