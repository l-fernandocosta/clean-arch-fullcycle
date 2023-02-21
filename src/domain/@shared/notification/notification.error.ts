import { NotificationErrorProps } from './notification.interface';

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors
        .map((error) => {
          return `${error.context} : ${error.message}`;
        })
        .join(',')
    );
  }
}
