import { NotificationError } from './notification.interface';

export class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error);
  }

  error_by_context(context?: string): NotificationError[] {
    if (context) {
      return this.errors.filter((error) => error.context === context);
    } else {
      return this.errors;
    }
  }
}
