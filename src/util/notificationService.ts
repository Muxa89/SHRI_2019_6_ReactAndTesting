export enum NotificationType {
  NOTIFICATION = 'NOTIFICATION',
  ERROR = 'ERROR'
}

export const displayNotification = (message: string, type: NotificationType = NotificationType.NOTIFICATION): void => {
  // TODO make visual implementation (save messages to store, display them in alerts)
  switch (type) {
    case NotificationType.ERROR:
      console.error(message);
      return;
    case NotificationType.NOTIFICATION:
    default:
      console.log(message);
      return;
  }
};
