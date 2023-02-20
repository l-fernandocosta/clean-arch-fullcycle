import { NotificationErrorProps } from './notification.interface';

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  error_by_context(context?: string): NotificationErrorProps[] {
    if (context) {
      return this.errors.filter((error) => error.context === context);
    } else {
      return this.errors;
    }
  }

  has_error(): boolean {
    return this.errors.length > 0;
  }

  get_errors(): NotificationErrorProps[] {
    return this.errors;
  }
}
