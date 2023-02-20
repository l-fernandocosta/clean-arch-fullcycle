import { NotificationErrorProps } from './notification.interface';

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors
        .map((error) => {
          console.log(`${error.context}:${error.message}`, 'console aqui');
          return `${error.context} : ${error.message}`;
        })
        .join(',')
    );
  }
}
