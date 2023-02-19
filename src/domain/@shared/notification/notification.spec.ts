import { Notification } from './notification';
import { NotificationError } from './notification.interface';

describe('unit test for notification', () => {
  it('should create a list of errors', () => {
    const notification = new Notification();

    const error: NotificationError = {
      message: 'Error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.error_by_context('customer')).toStrictEqual([
      {
        message: 'Error message',
        context: 'customer',
      },
    ]);

    const second_error: NotificationError = {
      message: 'Error message 2',
      context: 'customer',
    };

    notification.addError(second_error);

    expect(notification.error_by_context('customer')).toStrictEqual([
      {
        message: 'Error message',
        context: 'customer',
      },
      {
        message: 'Error message 2',
        context: 'customer',
      },
    ]);

    const third_error: NotificationError = {
      message: 'error message 3',
      context: 'order',
    };

    notification.addError(third_error);

    expect(notification.error_by_context().length).toBe(3);
  });
});
